import NewProposalForm from './NewProposalForm'
import { useGetUsersQuery } from '../professors/professorsApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'

const NewProposal = () => {
    const {users} = useGetUsersQuery("usersList",{
        selectFromResult: ({data}) =>({
         users : data?.ids.map(id => data?.entities[id])
        }),
    })
    if(!users?.length) return <PulseLoader color={"#FFF"} />
    console.log(`users:> ${users}`)
    const content =  <NewProposalForm users={users} /> 
     //console.log(`users:> ${users}`)
    return content
}
export default NewProposal