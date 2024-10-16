import { Link } from "react-router-dom"

export default function Header() {
    return (
        <>
            <Link to={"/home"} style={{textDecoration: 'none'}}>
                <h1 style={{textAlign:'left', paddingLeft:20,}}>Bonds</h1>
            </Link>
        </>
    )
}