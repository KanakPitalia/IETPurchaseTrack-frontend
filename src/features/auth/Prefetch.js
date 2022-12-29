import { store } from '../../app/store'
import { proposalsApiSlice } from '../proposals/proposalsApiSlice'
import { professorsApiSlice } from '../professors/professorsApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
         store.dispatch(proposalsApiSlice.util.prefetch('getProposals','proposalsList',{force:true}))
         store.dispatch(professorsApiSlice.util.prefetch('getUsers','usersList',{force: true}))

      
    }, [])

    return <Outlet />
}
export default Prefetch
