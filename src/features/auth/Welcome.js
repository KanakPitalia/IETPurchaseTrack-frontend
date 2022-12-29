import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
const Welcome = () => {
    
    const { status, isDirector} = useAuth()
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)
    const check = (status==="Professor") || (isDirector)
    console.log(status==="Professor")
    console.log(isDirector)
    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome !</h1>

          <p><Link to="/dash/proposals">View Proposals</Link></p>
              
          { check && <p><Link to="/dash/proposals/new">Add New Proposal</Link></p>}

           {(isDirector) && <p><Link to="/dash/professors">View Professor List </Link></p>}

           {(isDirector) && <p><Link to="/dash/professors/new">Add New Professor </Link></p>}

        </section>
    )

    return content
}
export default Welcome