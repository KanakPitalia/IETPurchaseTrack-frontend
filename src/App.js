import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import ProposalsList from './features/proposals/ProposalsList'
import ProfessorsList from './features/professors/ProfessorsList'
import EditProfessor from './features/professors/EditProfessor'
import NewProfessorForm from './features/professors/NewProfessorForm'
import EditProposal from './features/proposals/EditProposal'
import NewProposal from './features/proposals/NewProposal'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles';
import useTitle from './hooks/useTitle';
import ConvertToFormat from './features/proposals/ConvertToFormat';
// import {id} from './features/proposals/EditProposal'

function App() {
  useTitle('Purchase Tracking App')
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
            {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
             {/* Protected Routes */}
        <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[ROLES.Director,ROLES.Professor,ROLES.Purchase_Head]}/>}>
        <Route element={<Prefetch />}>
          <Route path="dash" element={<DashLayout />}>

            <Route index element={<Welcome />} />
               
            <Route element={<RequireAuth allowedRoles={[ROLES.Director]}/>}>
            <Route path="professors">
              <Route index element={<ProfessorsList />} />
              <Route path=":id" element={<EditProfessor />} />
              <Route path="new" element={<NewProfessorForm />} />
            </Route>
            </Route>
            <Route path="proposals">
              <Route index element={<ProposalsList />} />
              <Route path=":id" element={<EditProposal />} />
              <Route path="new" element={<NewProposal />} />
              <Route path="format/:id" element={<ConvertToFormat  />} />
            </Route>

          </Route>{/* End Dash */}
        </Route>
        </Route>
        </Route>{/* End Protected Routes */}

        
      </Route>
    </Routes>
  );
}

export default App;
