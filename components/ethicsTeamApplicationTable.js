import { useRouter } from 'next/router'
import { Button } from '@mantine/core'

const EthicsTeamApplicationTable = ({ application }) => {
  const { id, student_name, applicationTitle, created_at, updated_at, assigned_to, status } = application
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
      <td className='clickable' onClick={() => router.push(`/ethics-team-review/${id}`)}>{student_name}</td>
      <td className='clickable' onClick={() => router.push(`/ethics-team-review/${id}`)}>{applicationTitle}</td>
      <td>{id}</td>
      <td>{formattedCreatedDate}</td>
      <td>{formattedUpdatedDate}</td>
      <td>{assigned_to}</td>
      <td>{status}</td>
      <td><Button onClick={() => router.push(`/ethics-team-review/${id}`)}>Review</Button></td>
    </tr>
  )
}

export default EthicsTeamApplicationTable