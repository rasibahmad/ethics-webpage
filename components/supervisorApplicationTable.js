import { useRouter } from 'next/router'
import { Button } from '@mantine/core'

const SupervisorApplicationTable = ({ application }) => {
  const { id, student_name, applicationTitle, created_at, updated_at, status } = application  
  const router = useRouter()

  // formatting dates from supabase
  const created = created_at
  const updated = updated_at
  const createdDate = new Date(created)
  const updatedDate = new Date(updated)
  const option = { day:'numeric', month:'numeric', year:'numeric' }
  const formattedCreatedDate = createdDate.toLocaleDateString('en-Uk', option);
  const formattedUpdatedDate = updatedDate.toLocaleDateString('en-Uk', option);
  
    return (
        <tr>
            <td className={status === 'Supervisor Review' ? 'clickable' : ''} onClick={() => router.push(`/supervisor-review/${id}`)}>{student_name}</td>
            <td className={status === 'Supervisor Review' ? 'clickable' : ''} onClick={() => router.push(`/supervisor-review/${id}`)}>{applicationTitle}</td>
            <td>{id}</td>
            <td>{formattedCreatedDate}</td>
            <td>{formattedUpdatedDate}</td>
            <td>{status}</td>
            {status === 'Supervisor Review' ? (
                <td><Button onClick={() => router.push(`/supervisor-review/${id}`)}>Review and Sign</Button></td>
            ) : (
                <td><Button onClick={() => router.push(`/supervisor-view/${id}`)}>View</Button></td>
            )}
        </tr>
    )
}

export default SupervisorApplicationTable