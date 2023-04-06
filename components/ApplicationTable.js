import { Button } from '@mantine/core'
import { useRouter } from 'next/router'
import { supabase } from '../client';

const ApplicationTable = ({ application }) => {
    const { id, applicationTitle, created_at, updated_at, status } = application
    const router = useRouter()

    // formatting dates from supabase
    const created = created_at
    const updated = updated_at
    const createdDate = new Date(created)
    const updatedDate = new Date(updated)
    const options = { month: 'numeric', day: 'numeric', year: 'numeric' }
    const formattedCreatedDate = createdDate.toLocaleDateString('en-Uk', options);
    const formattedUpdatedDate = updatedDate.toLocaleDateString('en-Uk', options);

    // delete application
    async function deleteApplication() {
        const { data, error } = await supabase
            .from('applications')
            .delete()
            .eq('id', id)

        if (data) {
            console.log(data)
        }
    }

    // cancel submitted application
    async function updateStatus() {
        const { data, error } = await supabase
            .from('applications')
            .update({ status: "Not Submitted" })
            .eq('id', id)
            .select()
    }

    // submit approved application to ethics team
    async function submitApproved() {
        const { data, error } = await supabase
            .from('applications')
            .update({ status: "Submitted" })
            .eq('id', id)
            .select()

        if (data) {
            router.push('/applications')
        }
    }

    return (
        <tr>
            {status === 'Not Submitted' ? (
                <td className='clickable' onClick={() => router.push(`/complete-application/${id}`)}>{applicationTitle}</td>
            ) : status === 'Supervisor Denied' ? (
                <td className='clickable' onClick={() => router.push(`/supervisor-denied/${id}`)}>{applicationTitle}</td>
            ) : status === 'Supervisor Approved' ? (
                <td className='clickable' onClick={() => router.push(`/supervisor-approved/${id}`)}>{applicationTitle}</td>
            ) : status === "Approved" ? (
                <td className='clickable' onClick={() => router.push(`/approved/${id}`)}>{applicationTitle}</td>
            ) : status === "On Hold" ? (
                <td className='clickable' onClick={() => router.push(`/on-hold/${id}`)}>{applicationTitle}</td>
            ) : (
                <td>{applicationTitle}</td>
            )}
            {status === 'Not Submitted' ? (
                <td className='clickable' onClick={() => router.push(`/complete-application/${id}`)}>{id}</td>
            ) : status === 'Supervisor Denied' ? (
                <td className='clickable' onClick={() => router.push(`/supervisor-denied/${id}`)}>{id}</td>
            ) : status === 'Supervisor Approved' ? (
                <td className='clickable' onClick={() => router.push(`/supervisor-approved/${id}`)}>{id}</td>
            ) : status === "Approved" ? (
                <td className='clickable' onClick={() => router.push(`/approved/${id}`)}>{id}</td>
            ) : status === "On Hold" ? (
                <td className='clickable' onClick={() => router.push(`/on-hold/${id}`)}>{id}</td>
            ) : (
                <td>{id}</td>
            )}
            <td>{formattedCreatedDate}</td>
            <td>{formattedUpdatedDate}</td>
            <td>{status}</td>
            {/* Action */}
            {status === "Not Submitted" ? (
                <td>
                    <Button onClick={() => router.push(`/complete-application/${id}`)}>Edit</Button>
                    <Button color="red" onClick={() => deleteApplication()}>Delete</Button>
                </td>
            ) : status === "Supervisor Review" ? (
                <td><Button color="orange" onClick={() => updateStatus()}>Cancel</Button></td>
            ) : status === "Supervisor Approved" ? (
                <td><Button onClick={() => submitApproved()}>Submit</Button></td>
            ) : status === "Supervisor Denied" ? (
                <td><Button onClick={() => router.push(`/supervisor-denied/${id}`)}>Edit</Button></td>
            ) : status === "Approved" ? (
                <td><Button onClick={() => router.push(`/approved/${id}`)}>View</Button></td>
            ) : status === "On Hold" ? (
                <td><Button onClick={() => router.push(`/on-hold/${id}`)}>Edit</Button></td>
            ) : (
                <td></td>
            )}
        </tr>
    )
}

export default ApplicationTable