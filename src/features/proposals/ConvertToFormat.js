import { useParams } from 'react-router-dom'
import ConvertToFormatForm from './ConvertToFormatForm'
import { useGetProposalsQuery } from './proposalsApiSlice'
import { useGetUsersQuery } from '../professors/professorsApiSlice'
import useAuth from '../../hooks/useAuth'
// import PulseLoader from 'react-spinners/PulseLoader'
// import { faHourglass1 } from '@fortawesome/free-solid-svg-icons'


const ConvertToFormat = () => {
    

    const { id } = useParams()
    console.log("id: ")
    console.log(id)

    const { username, isDirector, isPurchase_Head } = useAuth()

    const { proposal } = useGetProposalsQuery("proposalsList", {
        selectFromResult: ({ data }) => ({
            proposal: data?.entities[id]
        }),
    })

    // const { users } = useGetUsersQuery("professorsList", {
    //     selectFromResult: ({ data }) => ({
    //         users: data?.entities[id]
    //     }),
    // })
    console.log("prooposals...format")
      console.log(proposal)
      
     
 console.log("users...")
//    console.log(users)

    // if (!isDirector && !isPurchase_Head) {
    //     if (proposal.username !== username) {
    //         return <p className="errmsg">No access</p>
    //     }
    // }
     
    const content = <ConvertToFormatForm proposal = {proposal} />
    

    return content
}
export default ConvertToFormat