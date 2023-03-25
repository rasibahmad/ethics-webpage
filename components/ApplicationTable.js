import { Button } from '@mantine/core'
import { useRouter } from 'next/router'
import { supabase } from '../client';
import { Link } from '@mantine/core'

const ApplicationTable = ({ application, setApplicationId }) => {
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

    return (
        <tr>
            <td onClick={() => router.push(`/complete-application/${id}`)}>{applicationTitle}</td>
            <td>{id}</td>
            <td>{formattedCreatedDate}</td>
            <td>{formattedUpdatedDate}</td>
            <td>{status}</td>
            {application.status === "Not Submitted" ? (
                <td><Button color="red" onClick={() => deleteApplication()}>Delete</Button></td>
            ) : application.status === "Supervisor Review" ? (
                <td><Button color="orange" onClick={() => updateStatus()}>Cancel</Button></td>
            ) : (
                <td></td>
            )}
        </tr>
    )
}

export default ApplicationTable