import iniPic from '../assets/ini.jpg'
import beyonce from '../assets/beyonce.jfif'
import chisomPic from '../assets/chisom.jpg'
import yourPic from '../assets/myPic.png'
import formABondBgPic from '../assets/eyhit.jpeg'
import jimmy from '../assets/jimmy.jpg'
import youradmirerBgPic1 from '../assets/cruel2.jpg'
import musicPic from '../assets/santino.jfif'
import youradmirerBgPic2 from '../assets/drake.png'
import musicPic2 from '../assets/drake.jfif'
import youradmirerBgPic3 from '../assets/ccp.jpg'

//JWT token is to allow for interacting with the backend only after authorization by the system
//Build with React First, if there's need for Redux you will know
//Each JWT token generated symbolizes a sign in user
//app.get('/users/:username/myBonds') -- getting 'My Bonds Elements' on the home page of the app
//app.post('/users/:username/myBonds')
//app.patch('/users/:username') -- editing user info

export default [
    {
        username: 'brileyakang',
        profilePhoto:yourPic,
        walletAddr: '0xdk...5392',
        location: 'Tokyo',
        bio: 'life is but a journey, each trip leaves a landmark for the next mile.' ,
        dates: [{id:1, songPic: formABondBgPic, ownerPic: jimmy, timeStarting: '2:00PM', artistName:'Odunsi (The Engine)', songTitle:'No PDA!'}],
        ongoingBonds: [ { _id: '890dhsd089h8sd807dsh0h90sdh0', bgImg: youradmirerBgPic1, artistImg: musicPic, name: "ojiims", status: "Ongoing" }, { _id: 'sd88sdhf89ehe39h3hphw9phehp83', bgImg: youradmirerBgPic2, artistImg: musicPic2, name: "somiethebeast", status: "Finished" }, {_id: '0d8hchw08wrfhwp83h939h4h3fp3h', bgImg: youradmirerBgPic3, artistImg: musicPic, name: "ojiims", status: "Not Yet Started"}],
        myBonds: [{img: iniPic, name: 'Organized ...', content: 'https://IPFS-LINK'}, {img: beyonce, name: 'Beyonce', content: 'https://IPFS-LINK'}, {img: chisomPic, name: 'Chisom', content: 'https://IPFS-LINK'}]
    },
    // { 
    //     username: 'thevictorjimmy',
    //     profilePhoto:jimmy,
    //     walletAddr: '0xc...4979',
    //     location: 'Japan',
    //     bio: 'Visual and Interaction Designer.' ,
    //     dates: [{id:1, songPic: formABondBgPic, ownerPic: jimmy, timeStarting: '2:00PM', artistName:'Odunsi (The Engine)', songTitle:'No PDA!'}],
    //     ongoingBonds: [ { _id: '890dhsd089h8sd807dsh0h90sdh0', bgImg: youradmirerBgPic1, artistImg: musicPic, name: "ojiims", status: "Ongoing" }, { _id: 'sd88sdhf89ehe39h3hphw9phehp83', bgImg: youradmirerBgPic2, artistImg: musicPic2, name: "somiethebeast", status: "Finished" }, {_id: '0d8hchw08wrfhwp83h939h4h3fp3h', bgImg: youradmirerBgPic3, artistImg: musicPic, name: "ojiims", status: "Not Yet Started"}],
    //     myBonds: [{img: iniPic, name: 'Organized ...', content: 'https://IPFS-LINK'}, {img: beyonce, name: 'Beyonce', content: 'https://IPFS-LINK'}, {img: chisomPic, name: 'Chisom', content: 'https://IPFS-LINK'}]
    // }
]