import { useRouter } from 'next/router'

const ApplicationTable = ({application, setApplicationId }) => {
  const { id, applicationTitle, created_at, updated_at, status } = application
  
  const router = useRouter()
  
    return (
        <tr>
            <td className="title" onClick={() => router.push(`/complete-application/${id}`)}>{applicationTitle}</td>
            <td>{id}</td>
            <td>{created_at}</td>
            <td>{updated_at}</td>
            <td>{status}</td>
        </tr>
    )
}

export default ApplicationTable