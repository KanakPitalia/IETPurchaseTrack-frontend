// import { useParams } from 'react-router-dom'
// import { useGetProposalsQuery } from './proposalsApiSlice'
// import { useGetUsersQuery } from '../professors/professorsApiSlice'
// import useAuth from '../../hooks/useAuth'
// import PulseLoader from 'react-spinners/PulseLoader'
// import EditProposalForm from './EditProposalForm'

// const EditProposal = () => {
//     const { id } = useParams()
//     const {username, isDirector} = useAuth()
//     const { proposal } = useGetProposalsQuery("proposalsList",{
//         selectFromResult: ({data}) =>({
//             proposal : data?.entities[id]
//         }),
//     })

//     const {users} = useGetUsersQuery("usersList",{
//         selectFromResult: ({data}) =>({
//             users  : data?.entities[id]
//         }),
//     })
//     console.log("USERS")

//     // console.log(proposal)
//     console.log(users)
//     if(!proposal || !users?.length) return <p>Loading...</p> // eslint-disable-next-line
//     if(!isDirector){
//         if(proposal.username !== username){
//             return <p className = "errmsg"> No Access</p>
//         }
//     }
//     const content =  <EditProposalForm proposal={proposal} users={users} /> 
//          console.log({proposal,users})
//     return content
// }
// export default EditProposal




// --------------------------



import { useParams } from 'react-router-dom'
import EditProposalForm from './EditProposalForm'
import { useGetProposalsQuery } from './proposalsApiSlice'
import { useGetUsersQuery } from '../professors/professorsApiSlice'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'


const EditProposal = () => {
    

    const { id } = useParams()
    console.log("anushka")
    console.log(id)

    const { username, isDirector, isPurchase_Head } = useAuth()

    const { proposal } = useGetProposalsQuery("proposalsList", {
        selectFromResult: ({ data }) => ({
            proposal: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("professorsList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })
    console.log("Proposals")
     console.log(proposal.items)
     
    if (!proposal || !users?.length) return <PulseLoader color={"#FFF"} />


    if (!isDirector && !isPurchase_Head) {
        if (proposal.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditProposalForm proposal={proposal} users={users} />

    return content
}
export default EditProposal