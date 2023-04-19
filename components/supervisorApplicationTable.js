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
    const type = { day: 'numeric', month: 'numeric', year: 'numeric' }
    const formattedCreatedDate = createdDate.toLocaleDateString('en-Uk', type);
    const formattedUpdatedDate = updatedDate.toLocaleDateString('en-Uk', type);

    return (
        <tr>
            {status === 'Supervisor Review' ? (
                <td className='clickable' onClick={() => router.push(`/supervisor-review/${id}`)}>{student_name}</td>
            ) : status === 'Rejected' ? (
                <td className='clickable' onClick={() => router.push(`/rejected/${id}`)}>{student_name}</td>
            ) : status === 'On Hold' ? (
                <td className='clickable' onClick={() => router.push(`/supervisors/on-hold/${id}`)}>{student_name}</td>
            ) : (
                <td className='clickable' onClick={() => router.push(`/supervisor-view/${id}`)}>{student_name}</td>
            )}
            {status === 'Supervisor Review' ? (
                <td className='clickable' onClick={() => router.push(`/supervisor-review/${id}`)}>{applicationTitle}</td>
            ) : status === 'Rejected' ? (
                <td className='clickable' onClick={() => router.push(`/rejected/${id}`)}>{applicationTitle}</td>
            ) : status === 'On Hold' ? (
                <td className='clickable' onClick={() => router.push(`/supervisors/on-hold/${id}`)}>{applicationTitle}</td>
            ) : (
                <td className='clickable' onClick={() => router.push(`/supervisor-view/${id}`)}>{applicationTitle}</td>
            )}
            {status === 'Supervisor Review' ? (
                <td className='clickable' onClick={() => router.push(`/supervisor-review/${id}`)}>{id}</td>
            ) : status === 'Rejected' ? (
                <td className='clickable' onClick={() => router.push(`/rejected/${id}`)}>{id}</td>
            ) : status === 'On Hold' ? (
                <td className='clickable' onClick={() => router.push(`/supervisors/on-hold/${id}`)}>{id}</td>
            ) : (
                <td className='clickable' onClick={() => router.push(`/supervisor-view/${id}`)}>{id}</td>
            )}
            <td>{formattedCreatedDate}</td>
            <td>{formattedUpdatedDate}</td>
            <td>{status}</td>
            {status === 'Supervisor Review' ? (
                <td><Button onClick={() => router.push(`/supervisor-review/${id}`)}>Review and Sign</Button></td>
            ) : status === 'Rejected' ? (
                <td><Button onClick={() => router.push(`/rejected/${id}`)}>View</Button></td>
            ) : status === 'On Hold' ? (
                <td><Button onClick={() => router.push(`/supervisors/on-hold/${id}`)}>View</Button></td>
            ) : (
                <td><Button onClick={() => router.push(`/supervisor-view/${id}`)}>View</Button></td>
            )}
        </tr>
    )
}

export default SupervisorApplicationTable