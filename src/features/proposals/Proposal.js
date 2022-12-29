import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { memo } from 'react'
import { useGetProposalsQuery } from './proposalsApiSlice'

const Proposal = ({ proposalId }) => {

    const { proposal } = useGetProposalsQuery("proposalsList",{
        selectFromResult: ({data}) =>({
            proposal: data?.entities[proposalId]
        }),
    })

    const navigate = useNavigate()

    if (proposal) {
        const created = new Date(proposal.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(proposal.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
        
       

        const handleEdit = () => navigate(`/dash/proposals/${proposalId}`)
        const handleFormat = () => navigate(`/dash/proposals/format/${proposalId}`)
        const remark =proposal.remark=== undefined ?<span className="note__status--open">Open </span>
        :<span className="note__status--open-remark">Open with remark</span>
        console.log(proposal.remark)
        return (
            <tr className="table__row">
                <td className="table__cell note__status">
                    {proposal.completed
                        ? <span className="note__status--completed">Approved</span>
                        :remark
                    }
                </td>
                <td className="table__cell note__created">{created}</td>
                <td className="table__cell note__updated">{updated}</td>
                
                <td className="table__cell note__title">{proposal.title}</td>
                <td className="table__cell note__username">{proposal.username}</td>
               

                <td className="table__cell">
                  <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                        className="icon-button table__button"
                        onClick={handleFormat}
                    >
                    Convert
                    </button>
                </td>
            </tr>
        )

    } else return null
}
const memoizedProposal = memo(Proposal)
export default memoizedProposal