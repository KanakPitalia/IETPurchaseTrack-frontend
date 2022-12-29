import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import { useLocation } from 'react-router-dom'
const DashLayout = () => {
    const {pathname} = useLocation()
    console.log("pathname")
    console.log(pathname)
    return (
        <>
         <DashHeader/>
            <div className="dash-container">
                <Outlet />
            </div>
            <DashFooter />
        </>
    )
}
export default DashLayout