import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isPurchase_Head = false
    let isDirector = false
    let status = "Professor"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isPurchase_Head = roles.includes('Purchase_Head')
        isDirector = roles.includes('Director')
        // isProfessor = roles.includes('Professor')

        if (isPurchase_Head) status = "Purchase_Head"
        if (isDirector) status = "Director"
       // if (isProfessor) status = "Professor"

        return { username, roles, status, isPurchase_Head, isDirector }
    }

    return { username: '', roles: [], isPurchase_Head, isDirector, status }
}
export default useAuth