import { useRouter } from 'next/router'
import { Button } from '@mantine/core'
import { useState } from 'react'

const EthicsTeamApplicationTable = ({ application, convertCSV }) => {
  const { id, student_name, applicationTitle, created_at, updated_at, assigned_to, status } = application  
  const router = useRouter()

  // formatting dates from supabase
  const created = created_at
  const updated = updated_at
  const createdDate = new Date(created)
  const updatedDate = new Date(updated)
  const option = { day:'numeric', month:'numeric', year:'numeric' }
  const formattedCreatedDate = createdDate.toLocaleDateString('en-Uk', option);
  const formattedUpdatedDate = updatedDate.toLocaleDateString('en-Uk', option);

  const [idFilter, setIdFilter] = useState('')
  const [studentNameFilter, setStudentNameFilter] = useState('')
  const [appTitleFilter, setAppTitleFilter] = useState('')
  const [assignedFilter, setAssignedFilter] = useState('')
  const [createdFilter, setCreatedFilter] = useState('')
  const [updatedFilter, setUpdatedFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filterApplications = application.filter((app) => {
    return (
        app.id.toString().includes(idFilter) &&
        app.student_name.toLowercase().includes(studentNameFilter.toLowerCase()) &&
        app.applicationTitle.toLowercase().includes(appTitleFilter.toLowerCase()) &&
        app.assigned_to.toLowercase().includes(assignedFilter.toLowerCase()) &&
        app.formattedCreatedDate.toLowercase().includes(createdFilter.toLowerCase()) &&
        app.formattedUpdatedDate.toLowercase().includes(updatedFilter.toLowerCase()) &&
        app.status.toLowercase().includes(statusFilter.toLowerCase()) 
    )
  });

  const exportCSV = () => {
    const headers = ['id', 'applicationTitle', 'student_name', 'created', 'updated', 'assigned_to', 'status'];
    const csvData = convertCSV(filterApplications, headers);
    const blob = new Blob([csvData], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'filterApplications.csv');
    document.body.appendChild(link);
    link.click()
    document.body.removeChild(link);
  }
  
    return (
        <div>
        <div>
        <label htmlFor='idFilter'>ID:</label>
        <input
            type= 'text'
            id='idFilter'
            value={idFilter}
            onChange={(e)=> setIdFilter(e.target.value)}
        />
        <Button onClick={exportCSV}>Export CSV</Button>
        </div>
        <div>
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
        </div>
        </div>
    )
}

export default EthicsTeamApplicationTable