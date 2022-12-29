import { useGetProposalsQuery } from "./proposalsApiSlice"
import Proposal from "./Proposal"
import useAuth from "../../hooks/useAuth"
import PulseLoader from 'react-spinners/PulseLoader'
const ProposalsList = () => {
    const {username, isPurchase_Head, isDirector} = useAuth()
    const {
        data: proposals,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProposalsQuery('proposalsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content =  <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = proposals
    
        let filteredIds
        if (isPurchase_Head || isDirector) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(proposalId => entities[proposalId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(proposalId => <Proposal key={proposalId} proposalId={proposalId} />)
            

        content = (
            <table className="table table--notes">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__status">Status</th>
                        <th scope="col" className="table__th note__created">Created</th>
                        <th scope="col" className="table__th note__updated">Updated</th>
                        <th scope="col" className="table__th note__title">Product Name (Title)</th>
                        <th scope="col" className="table__th note__username">Proposed_By</th>
                        <th scope="col" className="table__th note__edit">Review</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }
   
    return content
}
export default ProposalsList