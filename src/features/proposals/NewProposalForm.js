import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { proposalsApiSlice, useAddNewProposalMutation,useUpdateProposalMutation } from "./proposalsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"


// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';


const NewProposalForm = ({ users }) => {

    const [addNewProposal, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewProposalMutation()
    

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const[items,setItems] = useState('')
    const[cost,setCost] = useState('')
    const[proposedTo,setproposedTo] = useState('')
    const[proposedBy,setproposedBy] = useState('')
    const [userId, setUserId] = useState(users[0].id)
    const [startDate, setStartDate] = useState('');
    const[remark,setRemark] = useState('')
    console.log(startDate)
    
   // <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        
      

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            setItems('')
            setCost('')
            setStartDate('')
            setRemark('')
            setproposedBy('')
            setproposedTo('')
            navigate('/dash/proposals')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onItemsChanged = e => setItems(e.target.value)
    const onCostChanged = e => setCost(e.target.value)
    const onRemarkChanged = e => setRemark(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)
    const onproposedToChanged = e => setproposedTo(e.target.value)
    const onproposedByChanged = e => setproposedBy(e.target.value)

    const canSave = [title, text, items, cost, startDate , userId,proposedBy,proposedTo].every(Boolean) && !isLoading

    const onSaveProposalClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewProposal({ user: userId, title, text, items, cost, startDate, proposedBy, proposedTo })
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username} ({user.roles})</option>
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''
    const validItemsClass = !items ? "form__input--incomplete" : ''
    const validCostClass = !cost ? "form__input--incomplete" : ''
    const validRemarkClass = !remark ? "form__input--incomplete" : ''
    const validproposedToClass = !proposedTo ? "form__input--incomplete" : ''
    const validproposedByClass = !proposedBy ? "form__input--incomplete" : ''


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveProposalClicked}>
                <div className="form__title-row">
                    <h2>New Proposal</h2>
                   
                    <div className="form__action-buttons">
                        {/* <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button> */}
                    </div>
                </div>
                <label className="form__label" htmlFor="title">* are mandatory</label>
                <label className="form__label" htmlFor="title">
                    Subject (Title)  *  :</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="text">
                  Requirement(Content)  *  :</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />
                   <label className="form__label" htmlFor="text">
                    Items   (format:  S.no  ProductName  Quantity ) * :</label>
                <textarea
                    className={`form__input form__input--text ${validItemsClass}`}
                    id="text"
                    name="text"
                    value={items}
                    onChange={onItemsChanged}
                />
                 <label className="form__label" htmlFor="text">
                    Approx-Budget  (in Number Only) * :</label>
                <input
                    className={`form__input  ${validCostClass}`}
                    id="text"
                    name="text"
                    value={cost}
                    type = "number"
                    onChange={onCostChanged}
                />
                 <label className="form__label" htmlFor="text">
                    Deadline(Expected-Date):</label>
                    
                    <input type="date" className="startDatePicker" onChange={e=>setStartDate(e.target.value)} />
                    {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                    
                {/* <textarea
                    className={`form__input form__input--text ${validDeadlineClass}`}
                    id="text"
                    name="text"
                    value={deadline}
                    onChange={onDeadlineChanged}
                /> */}
                <label className="form__label" htmlFor="note-text">
                    Remark (GIVEN BY  DIRECTOR) * :</label>
                <textarea
                    className={`form__input form__input--text ${validRemarkClass}`}
                    id="note-text"
                    name="text"
                    value={remark}
                    readOnly= {true}
                    onChange={onRemarkChanged}
                />

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
                <label className="form__label form__checkbox-container" htmlFor="username">
                    Submit TO  *  :</label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>
                <button
                            className="icon-button-saveButton"
                            title="Save"
                            disabled={!canSave}
                        >
                           Submit <FontAwesomeIcon icon={faSave} />
                        </button>

            </form>
            
        </>
    
    )
    console.log(`date: is ${startDate}`)
       
    return content
}

export default NewProposalForm