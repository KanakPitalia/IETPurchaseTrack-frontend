import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'

const DASH_REGEX = /^\/dash(\/)?$/
const PROPOSALS_REGEX = /^\/dash\/proposals(\/)?$/
const USERS_REGEX = /^\/dash\/professors(\/)?$/

const DashHeader = () => {

    const {isPurchase_head, isDirector,username} = useAuth()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewProposalClicked = () => navigate('/dash/proposals/new')
    const onNewProfessorClicked = () => navigate('/dash/professors/new')
    const onProposalsClicked = () => navigate('/dash/proposals')
    const onProfessorsClicked = () => navigate('/dash/professors')

   
    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !PROPOSALS_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }
   
    let newProposalButton = null
    if (PROPOSALS_REGEX.test(pathname)) {
        newProposalButton = (
            <button
                className="icon-button"
                title="New Proposal"
                onClick={onNewProposalClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newProfessorButton = null
    if (USERS_REGEX.test(pathname)) {
        newProfessorButton = (
            <button
                className="icon-button"
                title="New Professor"
                onClick={onNewProfessorClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let professorButton = null
    if (isDirector) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            professorButton = (
                <button
                    className="icon-button"
                    title="Professors"
                    onClick={onProfessorsClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let proposalsButton = null
    if (!PROPOSALS_REGEX.test(pathname) && pathname.includes('/dash')) {
        proposalsButton = (
            <button
                className="icon-button"
                title="Proposals"
                onClick={onProposalsClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }


    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const errClass = isError ? "errmsg" : "offscreen"

    let buttonContent
    if (isLoading) {
        buttonContent = <PulseLoader color={"#FFF"} />
    } else {
        buttonContent = (
            <>
                {newProposalButton}
                {newProfessorButton}
                {proposalsButton}
                {professorButton}
                {logoutButton}
            </>
        )
    }
    const content = (
        <>
        <p className={errClass}>{error?.data?.message}</p>
        <header className="dash-header">
            <div className={`dash-header__container ${dashClass}`}>
                <Link to="/dash">
                    <h1 className="dash-header__title">Purchase_Tracker</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/* add more buttons later */}
                  <h2 className='dash-username'>{username} </h2>
                    {buttonContent}
                </nav>
            </div>
        </header>
        </>
    )

    return content
}
export default DashHeader