import { useState, useEffect } from "react"
import { useUpdateProposalMutation, useDeleteProposalMutation } from "./proposalsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"
import moment from "moment"
import { Link } from "react-router-dom"
import ConvertToFormat from "./ConvertToFormat"

const EditProposalForm = ({ proposal, users }) => {

    const { isDirector} = useAuth()
    const [updateProposal, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateProposalMutation()

    const [deleteProposal, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteProposalMutation()

    const navigate = useNavigate()
 
    const [title, setTitle] = useState(proposal.title)
    const [text, setText] = useState(proposal.text)
    const[items,setItems] = useState(proposal.items)
    const[cost,setCost] = useState(proposal.cost)
    const [startDate, setStartDate] = useState(proposal.startDate);
    const [completed, setCompleted] = useState(proposal.completed)
    const [userId, setUserId] = useState(proposal.user)
    const [proposedTo, setproposedTo] = useState(proposal.proposedTo)
    const [proposedBy, setproposedBy] = useState(proposal.proposedBy)
    const[remark,setRemark] = useState(proposal.remark)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setItems('')
            setCost('')
            setStartDate('')
            setCompleted('')
            setUserId('')
            setRemark('')
            setproposedBy('')
            setproposedTo('')
            navigate('/dash/proposals')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onItemsChanged = e => setItems(e.target.value)
    const onCostChanged = e => setCost(e.target.value)
    const onRemarkChanged = e => setRemark(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)
    const onproposedToChanged = e => setproposedTo(e.target.value)
    const onproposedByChanged = e => setproposedBy(e.target.value)


    const canSave = [title, text,items,cost,startDate, userId, proposedBy, proposedTo].every(Boolean) && !isLoading

    const onSaveProposalClicked = async (e) => {
        if (canSave) {
            await updateProposal({ id: proposal.id, user: userId, title, text, items,cost,startDate, completed,remark, proposedBy,proposedTo })
        }
    }

    const onDeleteProposalClicked = async () => {
        await deleteProposal({ id: proposal.id })
    }
    
   
    const created = new Date(proposal.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(proposal.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username} ({user.roles})</option>
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''
    const validItemsClass = !items ? "form__input--incomplete" : ''
    const validCostClass = !cost ? "form__input--incomplete" : ''
    const validRemarkClass = !remark ? "form__input--incomplete" : ''
    const validproposedToClass = !proposedTo ? "form__input--incomplete" : ''
    const validproposedByClass = !proposedBy ? "form__input--incomplete" : ''


    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''
    console.log(proposal)
    let deleteButton = null
    if (isDirector) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteProposalClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }
   
    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Proposal #{proposal.ticket}</h2>
                    <div className="form__action-buttons">
                        {/* <button
                            className="icon-button-saveButton"
                            title="Save"
                            onClick={onSaveProposalClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button> */}
                       {deleteButton}
                    </div>
                </div>
                <label className="form__label" htmlFor="note-title">
                    Subject  (Title) * :</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="note-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="note-text">
                    Requirement(Content)  * :</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="note-text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />
                 <label className="form__label" htmlFor="note-items">
                    Items  (format=  S.no  ProductName  Quantity ) *   :</label>
                <textarea
                    className={`form__input form__input--text ${validItemsClass}`}
                    id="note-items"
                    name="items"
                    value={items}
                    onChange={onItemsChanged}
                />
                 <label className="form__label" htmlFor="note-cost">
                    Approx-Budget:  (in Number Only) * </label>
                <input
                    className={`form__input  ${validCostClass}`}
                    id="note-cost"
                    name="cost"
                    value={cost}
                    type="number"
                    onChange={onCostChanged}
                />
                 <label className="form__label" htmlFor="note-deadline">
                    Deadline(Expected-Date):</label>
                    <h3>{moment(startDate).utc().format('DD-MM-YYYY')}</h3>
                    {/* <input type="date" className="startDatePicker" onChange={e=>setStartDate(e.target.value)} /> */}
                    {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                {/* <textarea
                    className={`form__input form__input--text ${validDeadlineClass}`}
                    id="note-deadline"
                    name="deadline"
                    value={deadline}
                    onChange={onDeadlineChanged}
                /> */}

             { ((isDirector) || (proposal.remark !== undefined)) &&
             <>  <label className="form__label" htmlFor="note-text">
                    Remark  (GIVEN BY DIRECTOR)  *  :</label>
                <textarea
                    className={`form__input form__input--text ${validRemarkClass}`}
                    id="note-text"
                    name="text"
                    value={remark}
                    onChange={onRemarkChanged}
                />
                </>}

                <div className="form__row">
                    <div className="form__divider">
                     { (isDirector) &&  <label className="form__label form__checkbox-container" htmlFor="note-completed">
                            Approve (Placed_For_Purchase?) :
                            <input
                                className="form__checkbox"
                                id="note-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />  (if not satisfied so don't click )
                        </label>
                
                     }
                     <label className="form__label" htmlFor="text">
                    Proposed To * :</label>
                <textarea
                    className={`form__input form__input--text ${validproposedToClass}`}
                    id="text"
                    name="text"
                    value={proposedTo}
                    onChange={onproposedToChanged}
                />
                  <label className="form__label" htmlFor="text">
                    Proposed By * :</label>
                <textarea
                    className={`form__input form__input--text ${validproposedByClass}`}
                    id="text"
                    name="text"
                    value={proposedBy}
                    onChange={onproposedByChanged}
                />

                        <label className="form__label form__checkbox-container" htmlFor="note-username">
                            Submit TO:</label>
                        <select
                            id="note-username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
                <button
                            className="icon-button-saveButton"
                            title="proposed"
                            onClick={onSaveProposalClicked}
                            type="submit"
                            disabled={!canSave}
                            
                        > 
                         Submit   <FontAwesomeIcon icon={faSave} />
                        </button>
                        {/* <button
                        type = "button"
                        className="icon-button-saveButton"
                        title="Convert"
                        onClick={handleFormat}
                    >
                        Convert to format
                    </button> */}

                           {/* <ConvertToFormat  proposal={proposal} users={users} />
                        <p><Link to="/dash/proposals/format">Convert To Format </Link></p> */}

            </form>
        </>
    )

    return content
}

export default EditProposalForm