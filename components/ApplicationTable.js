import { Button } from '@mantine/core'
import React from 'react';
import { useRouter } from 'next/router'
import { supabase } from '../client';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

const ApplicationTable = ({ application, refreshApplications }) => {
    const { id, applicationTitle, created_at, updated_at, status } = application
    const router = useRouter()

    // formatting dates from supabase
    const created = created_at
    const updated = updated_at
    const createdDate = new Date(created)
    const updatedDate = new Date(updated)
    const type = { month: 'numeric', day: 'numeric', year: 'numeric' }
    const formattedCreatedDate = createdDate.toLocaleDateString('en-Uk', type);
    const formattedUpdatedDate = updatedDate.toLocaleDateString('en-Uk', type);

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

    // cancel application submitted to supervisor
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
            ) : status === "Rejected" ? (
                <td className='clickable' onClick={() => router.push(`/rejected/${id}`)}>{applicationTitle}</td>
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
            ) : status === "Rejected" ? (
                <td className='clickable' onClick={() => router.push(`/rejected/${id}`)}>{id}</td>
            ) : (
                <td>{id}</td>
            )}
            <td>{formattedCreatedDate}</td>
            <td>{formattedUpdatedDate}</td>
            <td>{status}</td>
            {/* Action */}
            {status === "Not Submitted" ? (
                <td>
                    <Button className="btn1" onClick={() => router.push(`/complete-application/${id}`)}>Edit</Button>
                    <Button color="red" onClick={async () => { await deleteApplication(); await refreshApplications(); notifications.show({ title: 'Application Deleted', message: 'Record has been removed from your account', autoClose: 10000, icon: <IconCheck /> }) }}>Delete</Button>
                </td>
            ) : status === "Supervisor Review" ? (
                <td><Button color="orange" onClick={async () => { await updateStatus(); await refreshApplications(); notifications.show({ title: 'Supervisor Review Cancelled', message: 'Application status updated to "Not Submitted"', autoClose: 10000, icon: <IconCheck /> }) }}>Cancel</Button></td>
            ) : status === "Supervisor Approved" ? (
                <td>
                    <Button className="btn1" onClick={() => router.push(`/supervisor-approved/${id}`)}>View</Button>
                    <Button onClick={async () => { await submitApproved(); await refreshApplications(); notifications.show({ title: 'Application Submitted!', message: 'Ethics team will review your application', autoClose: 10000, icon: <IconCheck />, color: 'teal' }) }}>Submit</Button>
                </td>
            ) : status === "Supervisor Denied" ? (
                <td><Button onClick={() => router.push(`/supervisor-denied/${id}`)}>Edit</Button></td>
            ) : status === "Approved" ? (
                <td><Button onClick={() => router.push(`/approved/${id}`)}>View</Button></td>
            ) : status === "On Hold" ? (
                <td><Button onClick={() => router.push(`/on-hold/${id}`)}>Edit</Button></td>
            ) : status === "Rejected" ? (
                <td><Button onClick={() => router.push(`/rejected/${id}`)}>View</Button></td>
            ) : (
                <td></td>
            )}
        </tr>
    )
}

export default ApplicationTable