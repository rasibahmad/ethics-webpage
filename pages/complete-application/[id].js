import { Textarea, Group, Button, TextInput, Checkbox, FileInput, Title, Paper, Grid } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../client'

const completeApp = () => {
  const router = useRouter()
  const { id } = router.query
  const [applicationTitle, setApplicationTitle] = useState('')
  const [applicationError, setApplicationError] = useState(null)
  const [student_name, setStudentName] = useState('')
  const [student_number, setStudentNumber] = useState('')
  const [student_email, setStudentEmail] = useState('')
  const [project_objectives, setProjectObjectives] = useState('')
  const [study_objectives, setStudyObjectives] = useState('')
  const [data_collection_method, setDataCollectionMethod] = useState('')
  const [data_collected, setDataCollected] = useState('')
  const [participant_recruitment, setParticipantRecruitment] = useState('')
  const [data_storage, setDataStorage] = useState('')
  const [data_evidence, setDataEvidence] = useState('')
  const [risk, setRisk] = useState('')
  const [comments, setComments] = useState('')
  const [checked, setChecked] = useState(false)
  const [isHumanParticipantsChecked, setIsHumanParticipantsChecked] = useState(false)
  const [isTestingApparatusChecked, setIsTestingApparatusChecked] = useState(false)
  const [isLoneWorkingChecked, setIsLoneWorkingChecked] = useState(false)
  const [isTravelRiskChecked, setIsTravelRiskChecked] = useState(false)
  const [isEmotionalRiskChecked, setIsEmotionalRiskChecked] = useState(false)
  const [other_risk, setOtherRisk] = useState('')
  const [isEnvironmentRiskChecked, setIsEnvironmentRiskChecked] = useState(false)
  const [isConflictInterestChecked, setIsConflictInterestChecked] = useState(false)
  const [isControversialChecked, setIsControversialChecked] = useState(false)
  const [isDataRiskChecked, setIsDataRiskChecked] = useState(false)
  const [student_signature, setStudentSignature] = useState('')
  const [supervisor_name, setSupervisorName] = useState('')
  const [supervisor_email, setSupervisorEmail] = useState('')

  const applicationForm = async (e) => {
    e.preventDefault()

    if (!student_email || !student_name || !student_number || !supervisor_name || !supervisor_email || !project_objectives || !study_objectives || !data_collection_method || !data_collected || !participant_recruitment || !data_storage || !data_evidence || !risk || !student_signature) {
      setApplicationError('Please complete the application form')
      return
    }

    const { data, error } = await supabase
      .from('applications')
      .update({ student_email, student_number, student_name, supervisor_name, supervisor_email, other_risk, project_objectives, study_objectives, data_collection_method, data_collected, participant_recruitment, data_storage, data_evidence, risk, comments, status: "Supervisor Review", student_signature })
      .eq('id', id)
      .select()

    if (error) {
      setApplicationError('Please complete the application form')
    }

    if (data) {
      setApplicationError(null)
      router.push('/applications')
    }
  }

  useEffect(() => {
    const fetchApplication = async () => {
      const { data, error } = await supabase
        .from('applications')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        // router.push('/applications')
      }

      if (data) {
        setApplicationTitle(data.applicationTitle)
      }
    }
    fetchApplication()
  }, [id])

  useEffect(() => {
    const checkbox = async () => {
      const { data, error } = await supabase
        .from('applications')
        .update({
          human_participants: isHumanParticipantsChecked, testing_apparatus: isTestingApparatusChecked,
          lone_working: isLoneWorkingChecked, travel_risk: isTravelRiskChecked, emotional_risk: isEmotionalRiskChecked,
          environment_risk: isEnvironmentRiskChecked, conflict_interest: isConflictInterestChecked, controversial_work: isControversialChecked, data_risk: isDataRiskChecked
        })
        .eq('id', id)

      if (error) {
        console.log(error.message)
        setChecked(!checked)
      }
    }
    checkbox()
  }, [isHumanParticipantsChecked, isTestingApparatusChecked, isLoneWorkingChecked, isTravelRiskChecked, isEmotionalRiskChecked, isEnvironmentRiskChecked, isConflictInterestChecked, isControversialChecked, isDataRiskChecked])

  async function uploadFile(files) {
    const [file] = files

    const { data, error } = await supabase.storage
      .from('documents')
      .upload(id, file);

    if (error) {
      console.log(error)
    }

    if (data) {
      console.log(data)
    }
  }

  return (
    <div className="application">
      <Grid gutter="lg" justify="center">
        <Grid.Col span={8}>
          <Paper shadow="xl" p="xl" withBorder>
            <Title order={3} align="center">Application Title: {applicationTitle}</Title>
            <Title order={4} align="center">Application ID: {id}</Title>
            <form onSubmit={applicationForm}>
              <TextInput
                label="Student Name"
                radius="md"
                withAsterisk
                onChange={(e) => setStudentName(e.target.value)}
              />
              <TextInput
                label="Student Email"
                radius="md"
                withAsterisk
                onChange={(e) => setStudentEmail(e.target.value)}
              />
              <TextInput
                label="Student Number"
                description="Enter 9-digit Student number"
                radius="md"
                withAsterisk
                onChange={(e) => setStudentNumber(e.target.value)}
              />
              <TextInput
                label="Supervisor Full Name"
                radius="md"
                withAsterisk
                onChange={(e) => setSupervisorName(e.target.value)}
              />
              <TextInput
                label="Supervisor Email"
                radius="md"
                withAsterisk
                onChange={(e) => setSupervisorEmail(e.target.value)}
              />
              <br></br>
              <br></br>
              <Title order={3}>Section 0: Ethics Declaration Questions</Title>
              <Title order={4}>Please tick the following boxes if your project will involve any of the following:</Title>
              <br></br>
              <Checkbox label="Human Participants" description="(including all types of interviews, questionnaires, focus groups, records relating to humans, use of online datasets or other secondary data, observations, usability testing, etc.)" onChange={(e) => setIsHumanParticipantsChecked(e.currentTarget.checked)} />
              <Checkbox label="Testing Apparatus" description="(including where you have developed new apparatus and are testing it for accuracy, including on yourself)" onChange={(e) => setIsTestingApparatusChecked(e.currentTarget.checked)} />
              <br></br>
              <Title order={4}>Risk to you, including:</Title>
              <br></br>
              <Checkbox label="Lone working during data collection" onChange={(e) => setIsLoneWorkingChecked(e.currentTarget.checked)} />
              <Checkbox label="Travel to areas where you may be at risk" onChange={(e) => setIsTravelRiskChecked(e.currentTarget.checked)} />
              <Checkbox label="Risk of emotional distress" onChange={(e) => setIsEmotionalRiskChecked(e.currentTarget.checked)} />
              <Checkbox label="Any risk to the environment" onChange={(e) => setIsEnvironmentRiskChecked(e.currentTarget.checked)} />
              <Checkbox label="Any conflict of interest" onChange={(e) => setIsConflictInterestChecked(e.currentTarget.checked)} />
              <Checkbox label="Work/research that could be considered controversial or be of reputational risk to Aston University" onChange={(e) => setIsControversialChecked(e.currentTarget.checked)} />
              <Checkbox label="Social media data and/or data from internet sources that could be regarded as private" onChange={(e) => setIsDataRiskChecked(e.currentTarget.checked)} />
              <Textarea label="Other: Please outline" radius="md" autosize minRows={2} onChange={(e) => setOtherRisk(e.target.value)} />
              <br></br>
              <br></br>
              <Title order={3}>Section 1: Study Details</Title>
              <Title order={4}>Please provide the following information about your study. Be as detailed as possible. Where a question is not relevant, please indicate ‘Not Applicable’ but also explain why you believe that to be so.</Title>
              <br></br>
              <Textarea
                placeholder=""
                label="Project Objectives"
                description="Please provide a brief outline of your overall project objectives"
                radius="md"
                withAsterisk
                autosize
                minRows={2}
                onChange={(e) => setProjectObjectives(e.target.value)}
              />
              <Textarea
                label="Study Objectives"
                description="Please explain how the study you are seeking ethical approval to conduct contributes to your overall project objectives"
                radius="md"
                withAsterisk
                autosize
                minRows={2}
                onChange={(e) => setStudyObjectives(e.target.value)}
              />
              <Textarea
                label="Data Collection Method(s) to be Used"
                description="Please outline your proposed data collection methods – e.g., questionnaire/survey, interview, observational study, etc. Justify their use and explain how you will conduct the data collection in practice, including timeframe"
                radius="md"
                withAsterisk
                autosize
                minRows={2}
                onChange={(e) => setDataCollectionMethod(e.target.value)}
              />
              <Textarea
                label="Data to be Collected"
                description="Please briefly outline the type of data to be collected"
                radius="md"
                withAsterisk
                autosize
                minRows={2}
                onChange={(e) => setDataCollected(e.target.value)}
              />
              <Textarea
                label="Participant Recruitment"
                description="Please outline how you will recruit participants to your study"
                radius="md"
                withAsterisk
                autosize
                minRows={2}
                onChange={(e) => setParticipantRecruitment(e.target.value)}
              />
              <Textarea
                label="Data Storage"
                description="Please outline where you will store your data (ideally, on an encrypted server; USB drives are not permissible)"
                radius="md"
                withAsterisk
                autosize
                minRows={2}
                onChange={(e) => setDataStorage(e.target.value)}
              />
              <Textarea
                label="For Secondary Data/Dataset Use Only: Compliance with Terms & Conditions of Use"
                description="If you will be in receipt of secondary data OR will be using an online, publicly available dataset, please provide evidence that you are observing any terms and conditions associated with its use and have permission to use it. Be mindful that just because data is available online does not mean that you are ethically entitled to use it for your study; this needs proven. If you are being given data by, for example, a third party, you need to be sure that the individual has permission to share the data with you."
                radius="md"
                withAsterisk
                autosize
                minRows={2}
                onChange={(e) => setDataEvidence(e.target.value)}
              />
              <Textarea
                label="Risk"
                description="Please outline any risks to either the participants in your study and/or yourself in the conduct of the study and what you have done to mitigate that risk"
                radius="md"
                withAsterisk
                autosize
                minRows={2}
                onChange={(e) => setRisk(e.target.value)}
              />
              <FileInput
                placeholder="Select Files"
                label="Attachments"
                description="Upload all documents for intended study (.docx)"
                radius="md"
                multiple
                accept='.docx'
                onChange={(e) => uploadFile(e)}
              />
              <Textarea
                placeholder="E.g. Questionnaire link"
                label="Additional Comments"
                radius="md"
                autosize
                minRows={2}
                onChange={(e) => setComments(e.target.value)}
              />
              <br></br>
              <br></br>
              <Title order={3}>Declaration</Title>
              <p>Student:</p>
              <p>I confirm the following:</p>
              <p>• The above is an accurate representation of my study activities;</p>
              <p>• That I shall not commence participant recruitment and/or data collection without ethical approval to do so (where applicable);</p>
              <p>• That I shall seek further ethical approval should I need to make any changes to my study after ethical approval has been granted (where applicable);</p>
              <p>• That I shall conduct my study with integrity and in accordance with the ethical approval granted (where applicable);</p>
              <p>• That, where necessary, I shall use existing or secondary data in accordance with terms and conditions of use or ethical approval, as applicable;</p>
              <p>• That I understand that if I breach the terms of the approval granted I may not be able to use the data collected in my project report and may face disciplinary procedures; and</p>
              <p>• That I shall respect my participants (where applicable) and the data I have collected and am using.</p>
              <TextInput label="Student Signature" placeholder="Print Name" withAsterisk radius="md" onChange={(e) => setStudentSignature(e.target.value)} />
              <Group position="right" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
              {applicationError && <p className='error' style={{ color: "red" }}>{applicationError}</p>}
            </form>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default completeApp