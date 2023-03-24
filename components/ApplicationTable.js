import { Button } from '@mantine/core'
import { useRouter } from 'next/router'
import { supabase } from '../client';
import { format } from 'date-fns';

const ApplicationTable = ({ application, setApplicationId }) => {
    const { id, applicationTitle, created_at, updated_at, status } = application

    const router = useRouter()

    // delete application
    async function deleteApplication() {
        const { data, error } = await supabase
            .from('applications')
            // .select()
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
            .update({status: "Not Submitted"})
            .eq('id', id)
            .select()
    }

    return (
        <tr>
            <td className="title" onClick={() => router.push(`/complete-application/${id}`)}>{applicationTitle}</td>
            <td>{id}</td>
            <td>{created_at}</td>
            <td>{updated_at}</td>
            <td>{status}</td>
            {application.status === "Not Submitted" ? (
            <td><Button color="red" onClick={() => deleteApplication()}>Delete</Button></td>
            ): (
                <td><Button color="orange" onClick={() => updateStatus()}>Cancel Submit</Button></td>
            )}           
        </tr>
    )
}

export default ApplicationTable