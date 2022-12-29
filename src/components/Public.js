import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">IET-DAVV Purchase Tracking System</span></h1>
            </header>
           {/* <div className='logo-campus'> 
           <img  src='./img/ietDavvLogo.png'/>
           </div> */}
            <footer>
                <Link className='public-professor-login' to="/login">Professor Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public