const express = require('express');
const multer = require('multer');
const Flutterwave = require('flutterwave-node-v3');
const open = import("open");
const http = require('http');
const { Server } = require('socket.io');
const app = express()
const server = http.createServer(app);
const cors = require('cors');
require('dotenv').config()
const jwt = require("jsonwebtoken")
const port = process.env.PORT || 5000;
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { GridFsStorage } = require('multer-gridfs-storage');




//middleware 
app.use(cors())
app.use(express.json())
app.use(session({
  secret: process.env.ENCRYPTION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set `secure: true` if using HTTPS
}));

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);






const io = new Server(server, {
  cors: {
    origin: "*", // Enable CORS for all origins, or restrict it to your frontend URL.
  }
});

let loopCount = 0;
let musicStartTime = Date.now();
let musicDuration = 0; // This will be set by the client when it connects

// Function to calculate the elapsed time since music started
function getMusicProgress() {
  if (musicDuration === 0) return { loopCount: 0, timeInCurrentLoop: 0 }; // No music duration set yet
  const now = Date.now();
  const elapsedTime = now - musicStartTime;
  loopCount = Math.floor(elapsedTime / musicDuration);
  const timeInCurrentLoop = elapsedTime % musicDuration;
  return { loopCount, timeInCurrentLoop };
}

io.on('connection', (socket) => {
  console.log('A user connected');

  // Receive music duration from the client
  socket.on('setMusicDuration', (duration) => {
    musicDuration = duration;
    musicStartTime = Date.now();  // Reset the start time when the duration is set
    const currentProgress = getMusicProgress();
    socket.emit('musicStatus', currentProgress);
  });

  // Send current music status to a newly connected client
  socket.on('getMusicStatus', () => {
    const currentProgress = getMusicProgress();
    socket.emit('musicStatus', currentProgress);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});






//MongoDB Connection


const { MongoClient, ServerApiVersion, GridFSBucket } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hree58n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Create a database and collections
    const database = client.db("bonds")
    const userCollections = database.collection("users");
    const ownedAssetCollections = database.collection("ownedAssets");
    const swapCollections = database.collection("swaps");

    let gfs = new GridFSBucket(database, {
      bucketName: 'audioFiles' // collection will be named audioFiles.files
    });

    // Create storage engine using multer-gridfs-storage
    const storage = new GridFsStorage({
      url: uri,
      file: (req, file) => {
        const { songName, artistName } = req.body;
        const username = req.params;
        return {
          bucketName: 'audioFiles',
          filename: `${songName}_${Date.now()}`,
          metadata: {
            artistName,
            username,
            songName,
            coverArt: req.body.coverArt // This will be the image URL or base64 string
          }
        };
      }
    });

    const upload = multer({ storage });
    



    const verifyJWT = (req, res, next) => {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      console.log('Received token:', token); // Log token for debugging
      
      if (!token) return res.status(401).json({ message: 'Unauthorized access' });
    
      jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
          if (err) return res.status(403).json({ message: 'Invalid token' });
          req.user = user; // Store user data (including username) in req.user
          next();
      });
    };


    // Route for processing the initial card payment
    app.post('/pay', async (req, res) => {
      const { card_number, cvv, expiry_month, expiry_year, currency, amount, fullname, email, phone_number, tx_ref } = req.body;

      const payload = {
          card_number,
          cvv,
          expiry_month,
          expiry_year,
          currency,
          amount,
          redirect_url: "https://www.google.com", // Replace with your redirect URL
          fullname,
          email,
          phone_number,
          enckey: process.env.ENCRYPTION_KEY,
          tx_ref
      };

      try {
          const response = await flw.Charge.card(payload);
          console.log(response);

          if (response.meta.authorization.mode === 'pin') {
              // PIN required, respond to frontend to capture PIN
              return res.status(200).json({ 
                  status: "success", 
                  message: "PIN required", 
                  meta: response.meta, 
                  data: response.data 
              });
          }

          if (response.meta.authorization.mode === 'redirect') {
              // Redirect required, send the redirect URL to the frontend
              return res.status(200).json({ 
                  status: "success", 
                  message: "Redirect required", 
                  redirect: response.meta.authorization.redirect 
              });
          }

          res.status(200).json(response);

      } catch (error) {
          console.error('Error processing payment:', error);
          res.status(500).json({ error: 'Payment failed' });
      }
    });


    // Route for handling re-authentication with PIN
    app.post('/pay/pin', async (req, res) => {
      const { card_number, cvv, expiry_month, expiry_year, currency, amount, fullname, email, phone_number, tx_ref, pin } = req.body;
    
      const payload = {
        card_number,
        cvv,
        expiry_month,
        expiry_year,
        currency,
        amount,
        fullname,
        email,
        phone_number,
        enckey: process.env.ENCRYPTION_KEY,
        tx_ref,
        authorization: {
          mode: 'pin',
          pin // Include the PIN in the payload
        }
      };

      console.log('Sending the following payload to Flutterwave:', payload);
    
      try {
        const response = await flw.Charge.card(payload);
        console.log('Response after submitting PIN:', response);
    
        if (response.meta.authorization.mode === 'otp') {
          // OTP required, send flw_ref back to frontend for OTP handling
          return res.status(200).json({
            status: "success",
            message: "OTP required",
            flw_ref: response.data.flw_ref
          });
        }
    
        // Payment successful
        res.status(200).json(response);
    
      } catch (error) {
        console.error('Error processing PIN payment:', error);
        res.status(500).json({ error: 'PIN Payment failed' });
      }
    });



    // Route for validating OTP
    app.post('/validate-otp', async (req, res) => {
      const { otp, flw_ref } = req.body;

      try {
          const response = await flw.Charge.validate({
              otp,
              flw_ref
          });
          console.log('OTP Validation Response:', response);
          res.status(200).json(response);

      } catch (error) {
          console.error('Error validating OTP:', error);
          res.status(500).json({ error: 'OTP Validation Failed' });
      }
    });


    // The route where we send the user's auth details (Step 4)
    app.post('/pay/authorize', async (req, res) => {
      const payload = req.session.charge_payload;
      // Add the auth mode and requested fields to the payload,
      // then call chargeCard again
      payload.authorization = {
          mode: req.session.auth_mode,
      };
      req.session.auth_fields.forEach(field => {
          payload.authorization.field = req.body[field];
      });
      const response = await flw.Charge.card(payload);

      switch (response?.meta?.authorization?.mode) {
          case 'otp':
              // Show the user a form to enter the OTP
              req.session.flw_ref = response.data.flw_ref;
              return res.redirect('/pay/validate');
          case 'redirect':
              const authUrl = response.meta.authorization.redirect;
              return res.redirect(authUrl);
          default:
              // No validation needed; just verify the payment
              const transactionId = response.data.id;
              const transaction = await flw.Transaction.verify({
                  id: transactionId
              });
              if (transaction.data.status == "successful") {
                  return res.redirect('/payment-successful');
              } else if (transaction.data.status == "pending") {
                  // Schedule a job that polls for the status of the payment every 10 minutes
                  transactionVerificationQueue.add({
                      id: transactionId
                  });
                  return res.redirect('/payment-processing');
              } else {
                  return res.redirect('/payment-failed');
              }
      }
    });



    // The route where we validate and verify the payment (Steps 5 - 6)
    app.post('/pay/validate', async (req, res) => {
      const response = await flw.Charge.validate({
          otp: req.body.otp,
          flw_ref: req.session.flw_ref
      });
      if (response.data.status === 'successful' || response.data.status === 'pending') {
          // Verify the payment
          const transactionId = response.data.id;
          const transaction = flw.Transaction.verify({
              id: transactionId
          });
          if (transaction.data.status == "successful") {
              return res.redirect('/payment-successful');
          } else if (transaction.data.status == "pending") {
              // Schedule a job that polls for the status of the payment every 10 minutes
              transactionVerificationQueue.add({
                  id: transactionId
              });
              return res.redirect('/payment-processing');
          }
      }

      return res.redirect('/payment-failed');
    });


    app.post('/pay/redirect', async (req, res) => {
      if (req.query.status === 'successful' || req.query.status === 'pending') {
          // Verify the payment
          const txRef = req.query.tx_ref;
          const transactionId = await redis.getAsync(`txref-${txRef}`);
          const transaction = flw.Transaction.verify({
              id: transactionId
          });
          if (transaction.data.status == "successful") {
              return res.redirect('/payment-successful');
          } else if (transaction.data.status == "pending") {
              // Schedule a job that polls for the status of the payment every 10 minutes
              transactionVerificationQueue.add({
                  id: transactionId
              });
              return res.redirect('/payment-processing');
          }
      }
  
      return res.redirect('/payment-failed');
    });




    // Webhook to handle payment verification after successful transaction
    app.post('/api/webhook', async (req, res) => {
      const payload = req.body;
      
      // Verify transaction
      if (payload.event === 'charge.completed' && payload.data.status === 'successful') {
        const txRef = payload.data.tx_ref;
        // Check and confirm payment in your database, update order status, etc.
        res.status(200).send('Transaction successful');
      } else {
        res.status(400).send('Invalid transaction');
      }
    });






     app.post("/api/set-token", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_SECRET, {
        expiresIn: '24h'
      });
      res.send({token})
     })

     // Protected route
    app.get('/home', verifyJWT, (req, res) => {
      res.send(`Welcome to the homepage, ${req.user.username}`);
    });



    // Users route -- starts

    // Signup Route
    app.post('/signup', async (req, res) => {
      const { username, email, password } = req.body;

      // Check if username or email already exists
      const existingUser = await userCollections.findOne({
          $or: [{ username }, { email }],
      });

      if (existingUser) {
          return res.status(400).json({
              error: 'Username or Email already exists',
          });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user in MongoDB
      await userCollections.insertOne({
          username,
          email,
          password: hashedPassword,
      });

      res.status(201).json({ message: 'User registered successfully' });
    });


    // Endpoint to log in a user
    app.post('/login', async (req, res) => {
      const { username, password } = req.body;
  
      // Check if user exists
      const user = await userCollections.findOne({ username });
      if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ username: user.username, id: user._id, email: user.email }, process.env.ACCESS_SECRET, { expiresIn: '10s' });
      res.json({ token });
    });

 
    app.get('/users', async (req, res) => {
      const result = await userCollections.find().toArray();
      res.send(result);
    })

    app.get('/users/:username', verifyJWT, async (req, res) => {
      const username = req.params.username;
      const query = {username: username}
      const result = await userCollections.find(query).toArray();
      res.send(result);
    })

    app.get('/users/:username/myBonds', async (req, res) => {
      const username = req.params.username;
      const usersCollection = userCollections
      const user = await usersCollection.findOne({ username: username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const result= user.myBonds;
      res.send(result);
    })

    app.get('/users/:username/ongoingBonds', async (req, res) => {
      const username = req.params.username;
      const usersCollection = userCollections
      const user = await usersCollection.findOne({ username: username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const result= user.ongoingBonds;
      res.send(result);
    })



    app.patch('/users/:username', async (req, res) => {
      const signedInUser = req.params.username;
      const { targetUser } = req.body;
    
      try {
        // Find the signed-in user's document
        const userDoc = await userCollections.findOne({ username: signedInUser });
    
        // If user document doesn't exist, return an error
        if (!userDoc) return res.status(404).json({ error: 'User not found' });
    
        let adoredList = userDoc.adored || [];
        let updatedAdoredList;
    
        // Check if the target user is already in the adored list
        if (adoredList.includes(targetUser)) {
          // If already adored, remove them from the list
          updatedAdoredList = adoredList.filter((user) => user !== targetUser);
        } else {
          // If not adored, add them to the list
          adoredList.push(targetUser);
          updatedAdoredList = adoredList;
        }
    
        // Update the signed-in user's adored list
        await userCollections.updateOne(
          { username: signedInUser },
          { $set: { adored: updatedAdoredList } },
          {upsert: true}
        );
    
        res.json({ adored: updatedAdoredList });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } 
    });


    app.get('/users/:username/adored/:targetUser', async (req, res) => {
      const signedInUser = req.params.username;
      const targetUser = req.params.targetUser;
    
      try {
        // Find the signed-in user's adored list
        const userDoc = await userCollections.findOne({ username: signedInUser });
    
        if (!userDoc) return res.status(404).json({ error: 'User not found' });
    
        // Check if the target user is adored
        const isAdored = userDoc.adored && userDoc.adored.includes(targetUser);
    
        res.json({ adored: isAdored });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });




    // User route -- ends

    // update user document... add to / delete from myBonds, onGoingBonds and dates 

    // Add to dates
    app.patch('/new-date/:username', verifyJWT, async (req, res) => {
      const username = req.params.username;
      const newDate = {...req.body, id:uuid.v4()};
      const options = {upsert: true};
      const updateDoc = {
          $push: {
             dates: newDate
          },
      }

      const result = await userCollections.findOneAndUpdate({username}, updateDoc, options)
      res.send(result)
    })


    // Add to ongoingBonds
    app.patch('/new-ongoingBonds/:username', verifyJWT, async (req, res) => {
      const username = req.params.username;
      const newOngongBond = {...req.body, id:uuid.v4()};
      const options = {upsert: true};
      const updateDoc = {
          $push: {
             ongoingBonds: newOngongBond
          },
      }

      const result = await userCollections.findOneAndUpdate({username}, updateDoc, options)
      res.send(result)
    })



    // Add to myBonds
    app.patch('/new-myBonds/:username', verifyJWT, async (req, res) => {
      const username = req.params.username;
      const newMyBond = {...req.body, id:uuid.v4()};
      const options = {upsert: true};
      const updateDoc = {
          $push: {
             myBonds: newMyBond
          },
      }

      const result = await userCollections.findOneAndUpdate({username}, updateDoc, options)
      res.send(result)
    })


    // remove from dates
    app.delete('/delete-date/:username/:id', verifyJWT, async (req, res) => {
      const { username, id } = req.params;
      const user = await userCollections.findOne({ username: username });
      if (!user) {
        return res.status(404).send('User not found');
      }
      const result = await userCollections.updateOne(
        { username: username },
        { $pull: { dates: { id: id } } }
      );
      if (result.modifiedCount === 0) {
        return res.status(404).send('Date entry not found or already deleted');
      }
      res.send(result);
    })

    // remove from myBond
    app.delete('/delete-myBond/:username/:id', verifyJWT, async (req, res) => {
      const {username, id} = req.params;
      const user = await userCollections.findOne({ username: username});
      if (!user) {
        return res.status(404).send('User not found');
      }

      const result = await userCollections.updateOne(
        { username: username},
        { $pull: { myBonds: { id: id} } }
      );
      if (result.modifiedCount === 0) {
        return res.status(404).send('Date entry not found or already deleted');
      }
      res.send(result);
    })

    // remove from ongoing Bonds
    app.delete('/delete-ongoingBonds/:username/:id', verifyJWT, async (req, res) => {
      const {username, id} = req.params;
      const user = await userCollections.findOne({ username: username});
      if (!user) {
        return res.status(404).send('User not found');
      }

      const result = await userCollections.updateOne(
        { username: username},
        { $pull: { ongoingBonds: { id: id} } }
      );
      if (result.modifiedCount === 0) {
        return res.status(404).send('Date entry not found or already deleted');
      }
      res.send(result);
    })

    // change status of OngoingBonds

    app.patch('/change-ongoingBondStatus/:username/:id', verifyJWT, async (req, res) => {
      const { username, id } = req.params;
      const { status } = req.body;

      if (typeof status !== 'string') {
        return res.status(400).send('Status must be a string');
      }

      const result = await userCollections.findOneAndUpdate(
        { username: username, 'ongoingBonds.id': id },
        {
          $set: { 'ongoingBonds.$.status': status }
        },
        { new: true, useFindAndModify: false } // Return the updated document
      );

      if (!result) {
        return res.status(404).send('User or bond not found');
      }
  
      res.send(result);
    })



    // update timeRemaining in Swaps

    app.patch('/updateTimeRemaining-InSwaps/:id', verifyJWT, async (req, res) => {
      const { id } = req.params;
      const { timeRemaining } = req.body;

      if (typeof timeRemaining !== 'string') {
        return res.status(400).send('timeRemaining must be a string');
      }

      const result = await swapCollections.updateOne(
        { _id: id },
        { $set: { timeRemaining: timeRemaining } }
      );

      if (result.matchedCount === 0) {
        return res.status(404).send('Document not found');
      }

      res.send({ modifiedCount: result.modifiedCount });
    })


    






    // OwnedAsset route -- starts
    // Endpoint to upload new owned asset
    app.post('/new-ownedAsset/:username', upload.single('audioFile'), verifyJWT, async (req, res) => {
      console.log('File:', req.file); // Logs the uploaded file object
      console.log('Body:', req.body); // Logs the form data (metadata)

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }
    
      res.status(201).json({
        message: 'File uploaded successfully',
        fileId: req.file._id, 
        metadata: req.file.metadata
      });
    });

    app.get('/ownedAssets', async (req, res) => {
      const result = await ownedAssetCollections.find().toArray();
      res.send(result);
    })
    // OwnedAsset route -- ends

    // Get Owned Asset by username
    app.get('/ownedAssets/:username', verifyJWT, async (req, res) => {
      const username = req.params.username;
      const query = {username: username}
      const result = await ownedAssetCollections.find(query).toArray();
      res.send(result);
    })

    // Swap route -- starts
    app.post('/new-swap', verifyJWT, async (req, res) => {
      const newSwap = req.body;
      const result = await swapCollections.insertOne(newSwap)
      res.send(result);
    })

    app.get('/swaps', async (req, res) => {
      const result = await swapCollections.find().toArray();
      res.send(result);
    })
    // Swap route -- ends











    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Welcome to Bonds server')
})

server.listen (port, () => {
    console.log(`Bonds platform app listening on port ${port}`)
})