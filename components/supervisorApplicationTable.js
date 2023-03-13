import { useRouter } from 'next/router'

const SupervisorApplicationTable = ({application, setApplicationId }) => {
  const { id, student_name, applicationTitle, created_at, updated_at, status } = application
  
  const router = useRouter()
  
    return (
        <tr>
            <td onClick={() => router.push(`/supervisor-review/${id}`)}>{student_name}</td>
            <td className="title" onClick={() => router.push(`/supervisor-review/${id}`)}>{applicationTitle}</td>
            <td>{id}</td>
            <td>{created_at}</td>
            <td>{updated_at}</td>
            <td>{status}</td>
        </tr>
    )
}

export default SupervisorApplicationTable