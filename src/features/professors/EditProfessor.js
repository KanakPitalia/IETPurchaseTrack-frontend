import { useParams } from 'react-router-dom'
import EditProfessorForm from './EditProfessorForm'
import { useGetUsersQuery } from './professorsApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'

const EditProfessor = () => {
    const { id } = useParams()

    const {user} = useGetUsersQuery("usersList",{
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })
    console.log(user)
     if(!user) return <PulseLoader color={"#FFF"}/>
     console.log("hello kanak")
    //  console.log(user)
    const content = <EditProfessorForm user={user} />

    return content
}
export default EditProfessor


