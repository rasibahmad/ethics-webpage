import { useUser, useSession } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import { Grid, Paper, Title, Text } from '@mantine/core';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";

export default function Home() {
  const user = useUser();
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login')
    }
  }, [session])

  return (
    <Grid gutter="lg" justify="center">
      <Grid.Col span={8}>
        <Paper shadow="xl" p="xl" withBorder>
          <Title order={2} align='center'>Welcome {user?.email}</Title>
          <br></br>
          <Text fz="md">This is the go-to destination for receiving approval from the Computer Science ethics committee for your research project. Here you can find guides and templates to walk you through your ethics application.</Text>
        </Paper>
      </Grid.Col>
      <Grid.Col span={8}>
        <Paper shadow="xl" p="xl" withBorder>
          <Title order={2} align='center'>Guides & Templates</Title>
          <br></br>
          <Text fw="700">
            Introduction
          </Text>
          <br></br>
          <Text fz="sm">
            All independent academic work – from staff research to undergraduate student projects – at Aston University needs to consider ethics.  Consideration of and handling of ethics approval, where applicable, is a professional skill which you should take seriously.  Failure to comply with the obligations related to ethics could seriously impact your ability to submit your final year project (FYP).
          </Text>
          <br></br>
          <br></br>
          <Text fw="700">
            General Overview of Acceptable Projects
          </Text>
          <br></br>
          <Text fw="700">
            We are not approving any undergraduate projects which involve any of the following:
          </Text>
          <Text fz="sm">
            • the NHS – either patients selected via the NHS or clinical staff working for the NHS;
          </Text>
          <Text fz="sm">
            • participants under the age of 18;
          </Text>
          <Text fz="sm">
            • vulnerable groups – individuals with physical disabilities, mental health disabilities/ill health, individuals with learning difficulties, prisoners/detained persons, people over 65 years of age, and/or pregnant women;
          </Text>
          <Text fz="sm">
            • procedures including: i) clinical procedures or ii) physical intervention or iii) penetration of the participant's body or iv) prescription of compounds additional to normal diet or other dietary manipulation/supplementation or v) collection of bodily secretions or vi) involve human tissue which comes within the Human Tissue Act; or
          </Text>
          <Text fz="sm">
            • delving into topics that might be sensitive, embarrassing or upsetting or where it is possible that criminal or other disclosures requiring action could take place (e.g., during interviews) – including but not limited to projects focusing on mental health.
          </Text>
          <br></br>
          <Text fz="sm">
            We would, for the purposes of your FYP, strongly advocate that you do not propose or insist on a project that would fall into these categories.  If this is unavoidable, please submit a question to discuss; any and all such projects would require College level ethical approval which can take anything upwards of a month or two to acquire and, even then, approval is unlikely due to the risks associated with such studies.
          </Text>
          <br></br>
          <br></br>
          <Text fw="700">
            Ethical Approval Process
          </Text>
          <br></br>
          <Text fz="sm">
            Step 1: Create an application in the applications tab.
          </Text>
          <br></br>
          <Text fz="sm">
            Step 2: Complete the application form.
          </Text>
          <br></br>
          <Text fz="sm">
            Step 3: For each method you propose to use – from the following set of options, you will require to complete and submit for approval a set of documentation with your application.  It is likely that you might use one or two of the methods at the start of your project to inform your requirements and others at the end of your project when you are evaluating your deliverable: you should submit your documents in a time appropriate manner for each phase of your work when you have sufficient clarity as to be able to document your intention and process in full.
          </Text>
          <br></br>
          <br></br>
          <Text fw="500" fs="italic">
            Questionnaire/Survey either Online or Paper-Based
          </Text>
          <Text fz="sm">
            You should complete the following documents (as appropriate) for your study:
          </Text>
          <br></br>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20Online%20Survey%20PIS.docx?t=2023-03-11T00%3A44%3A39.400Z'}> CS3IP Online Survey PIS.docx </Link>
          </Text>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20Online%20Survey%20Consent.docx'}> CS3IP Online Survey Consent.docx </Link>
          </Text>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20Online%20Survey%20Recruitment%20Message.docx'}> CS3IP Online Survey Recruitment Message.docx </Link>
          </Text>
          <br></br>
          <Text fz="sm">
            OR
          </Text>
          <br></br>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20Paper%20Survey%20PIS.docx'}> CS3IP Paper Survey PIS.docx </Link>
          </Text>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20Paper%20Survey%20Consent.docx'}> CS3IP Paper Survey Consent.docx </Link>
          </Text>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20Paper%20Survey%20Recruitment%20Message.docx'}> CS3IP Paper Survey Recruitment Message.docx </Link>
          </Text>
          <br></br>
          <Text fz="sm">
            In each of the above, <b>edit only the content shown as 'editable placeholder content' in grey and recolour it to black</b> to fit in with the rest of the document.  Hints and tips are included to indicate what you need to put in place of the placeholder (including the footer): none of the other content should be edited – it is required and fixed (i.e., non-negotiable without discussion with the ethics team).  The editable content needs to help inform the potential participants of the goal of the project and the specific study as well as why they are being invited to participate and what will be expected of them so that they can make an informed decision as to whether or not to voluntarily participate.  Think about what information you would want to have provided to you if you were to be invited to participate in someone else’s study.
          </Text>
          <br></br>
          <Text fz="sm">
            When creating an <b>online</b> survey/questionnaire, you should include the content of the PIS as the landing page of the questionnaire (ideally as actual content, not as a scanned copy of the PIS to enable screen readers to cope with the text).  Following this, you should include the consent content: following the consent content, you should have a “close” and “next” button grouping.  The “close” button should shut down the questionnaire/browser; the “next” button should allow the participant to access the rest of the questionnaire which should appear from the next page onwards: only once this is “next” button is clicked should the questionnaire questions be visible – this is known as click through consent.  A paper-based questionnaire should also include the process of consent but it will obviously need to be conducted via the paper-based consent form.
          </Text>
          <br></br>
          <Text fz="sm">
            Some hints and tips for your questionnaire questions:
          </Text>
          <Text fz="sm">
            1. Do not ask any unnecessary questions (including in relation to collection of personal data) – ethically, you should only ask questions for which there is strong justification;
          </Text>
          <Text fz="sm">
            2. As noted above, do not ask any questions related to topics that could be considered sensitive, embarrassing or upsetting or where it is possible that criminal or other disclosures requiring action could take place – including but not limited to projects focusing on mental health;
          </Text>
          <Text fz="sm">
            3. Do not require participants to answer any given question – they should be free to skip any question they are not comfortable answering;
          </Text>
          <Text fz="sm">
            4. Ideally, collect data that is fully anonymous from the start – that is, no questions ask for information that could identify the respondent, either in isolation or in combination (i.e., if someone was to have the full set of responses, they should not be able to work out who the respondent is via the combination of answers); if you do collect data (deliberately or by accident – e.g., a participant reveals something in a free text response) that identifies the respondent, you should anonymise it in processing the data and then delete the original, raw dataset; and
          </Text>
          <Text fz="sm">
            5. For <b>online questionnaires</b>, ensure that, following the last question, there is a “submit” button and it is only when this button is selected that data is made persistent and for <b>paper-based questionnaires</b> ensure that there is a non-burdensome mechanism by which participants can return the questionnaire to you.
          </Text>
          <br></br>
          <Text fz="sm" td="underline">
            You will need to submit the paper-based version of your questionnaire as well as, for online questionnaires, a link to the online questionnaire for approval.
          </Text>
          <br></br>
          <br></br>
          <Text fw="500" fs="italic">
            Interviews & Focus Groups either Online or In Person
          </Text>
          <Text fz="sm">
            You should complete the following documents for your study as applicable:
          </Text>
          <br></br>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20Online%20Interview%20PIS.docx'}> CS3IP Online Interview PIS.docx </Link>
          </Text>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20Online%20Interview%20Consent.docx'}> CS3IP Online Interview Consent.docx </Link>
          </Text>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20Online%20Interview%20Recruitment%20Message.docx'}> CS3IP Online Interview Recruitment Message.docx </Link>
          </Text>
          <Text fz="sm">
            AND/OR
          </Text>
          <br></br>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20In%20Person%20Interview%20PIS.docx'}> CS3IP In Person Interview PIS.docx </Link>
          </Text>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20In%20Person%20Interview%20Consent.docx'}> CS3IP In Person Interview Consent.docx </Link>
          </Text>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20In%20Person%20Interview%20Recruitment%20Message.docx'}> CS3IP In Person Interview Recruitment Message.docx </Link>
          </Text>
          <br></br>
          <Text fz="sm">
            AND/OR
          </Text>
          <br></br>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20Online%20Focus%20Group%20PIS.docx'}> CS3IP Online Focus Group PIS.docx </Link>
          </Text>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20Online%20Focus%20Group%20Consent.docx'}> CS3IP Online Focus Group Consent.docx </Link>
          </Text>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20Online%20Focus%20Group%20Recruitment%20Message.docx'}> CS3IP Online Focus Group Recruitment Message.docx </Link>
          </Text>
          <br></br>
          <Text fz="sm">
            AND/OR
          </Text>
          <br></br>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20In%20Person%20Focus%20Group%20PIS.docx'}> CS3IP In Person Focus Group PIS.docx </Link>
          </Text>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20In%20Person%20Focus%20Group%20Consent.docx'}> CS3IP In Person Focus Group Consent.docx </Link>
          </Text>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20In%20Person%20Focus%20Group%20Recruitment%20Message.docx'}> CS3IP In Person Focus Group Recruitment Message.docx </Link>
          </Text>
          <br></br>
          <Text fz="sm">
            In each of the above (as applicable – i.e., either the interview sets or the focus group sets), <b>edit only the content shown as 'editable placeholder content' in grey and recolour it to black to fit in with the rest of the document.</b>  Hints and tips are included to indicate what you need to put in place of the placeholder (including the footer): none of the other content should be edited – it is required and fixed (i.e., non-negotiable without discussion with the ethics team).  The editable content needs to help inform the potential participants of the goal of the project and the specific study as well as why they are being invited to participate and what will be expected of them so that they can make an informed decision as to whether or not to voluntarily participate.  Think about what information you would want to have provided to you if you were to be invited to participate in someone else’s study.
          </Text>
          <br></br>
          <Text fz="sm">
            As indicated in the recruitment message text, you should attach the PIS and Consent Form to your recruitment email. Participants can then reflect on what is being asked of them and get in touch if they agree to participate. <b>You MUST be in possession of a signed Consent Form (the participant signs first) before you commence your study with them.</b>
          </Text>
          <br></br>
          <Text fz="sm">
            Some hints and tips for your interview/focus groups:
          </Text>
          <Text fz="sm">
            1. Do not ask any unnecessary questions (including in relation to collection of personal data) – ethically, you should only ask questions for which there is strong justification;
          </Text>
          <Text fz="sm">
            2. As noted above, do not ask any questions related to topics that could be considered sensitive, embarrassing or upsetting or where it is possible that criminal or other disclosures requiring action could take place – including but not limited to projects focusing on mental health;
          </Text>
          <Text fz="sm">
            3. Do not require participants to answer any given question in an interview/focus group – they should be free to skip any question they are not comfortable answering and this should be reinforced to them at the start (see below);
          </Text>
          <Text fz="sm">
            4. Consider very carefully what you are asking in a focus group given that the rest of the participants will be privy to each other’s responses and, as such, confidentiality is hard (if not impossible) to ensure;
          </Text>
          <Text fz="sm">
            5. Ensure that you reconfirm agreement to record the session (interview or focus group) before starting and reiterate that participants are free to leave at any point as well to refuse to answer any question they are not comfortable answering; in the case of focus groups, it is also important to stress that whilst individuals can withdraw at any point during the session, because they will have contributed to group discussion, their contribution up to the point they leave cannot be withdrawn but direct quotes from them will not be used; and
          </Text>
          <Text fz="sm">
            6. In the case of focus groups, stress the expectation of confidentiality before commencing.
          </Text>
          <br></br>
          <Text fz="sm" td="underline">
            You will need to submit a document containing the interview questions/focus group prompts in your submission package for approval.
          </Text>
          <br></br>
          <Text fz="sm">
            IMPORTANT: Because audio recordings are considered to represent personally identifiable information, it is important that once you have created anonymised transcripts of the discussion (i.e., in which any identifiable references are redacted) you destroy the original recordings.  Participants should only be identified via a code in all such transcripts.
          </Text>
          <br></br>
          <br></br>
          <Text fw="500" fs="italic">
            Usability Tests Online or In Person
          </Text>
          <Text fz="sm">
            You should complete the following documents for your study:
          </Text>
          <br></br>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20Online%20Usability%20Test%20PIS.docx'}> CS3IP Online Usability Test PIS.docx </Link>
          </Text>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20Online%20Usabilty%20Test%20Consent.docx'}> CS3IP Online Usabilty Test Consent.docx </Link>
          </Text>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20Online%20Usability%20Test%20Recruitment%20Message.docx'}> CS3IP Online Usability Test Recruitment Message.docx </Link>
          </Text>
          <br></br>
          <Text fz="sm">
            OR
          </Text>
          <br></br>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20In%20Person%20Usability%20Test%20PIS-2.docx'}> CS3IP In Person Usability Test PIS.docx </Link>
          </Text>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20In%20Person%20Usabilty%20Test%20Consent.docx'}> CS3IP In Person Usabilty Test Consent.docx </Link>
          </Text>
          <Text fz="sm">
            • <Link href={'https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/templates/CS3IP%20In%20Person%20Usability%20Test%20Recruitment%20Message.docx'}> CS3IP In Person Usability Test Recruitment Message.docx </Link>
          </Text>
          <br></br>
          <Text fz="sm">
            In each of the above, <b>edit only the content shown as 'editable placeholder content' in grey and recolour it to black to fit in with the rest of the document.</b>  Hints and tips are included to indicate what you need to put in place of the placeholder (including the footer): none of the other content should be edited – it is required and fixed (i.e., non-negotiable without discussion with the ethics team).  The editable content needs to help inform the potential participants of the goal of the project and the specific study as well as why they are being invited to participate and what will be expected of them so that they can make an informed decision as to whether or not to voluntarily participate.  Think about what information you would want to have provided to you if you were to be invited to participate in someone else’s study.
          </Text>
          <br></br>
          <Text fz="sm">
            As indicated in the recruitment message text, you should attach the PIS and Consent Form to your recruitment email. Participants can the reflect on what is being asked of them and get in touch if they agree to participate. <b>You MUST be in possession of a signed Consent Form (the participant signs first) before you commence your study with them.</b>
          </Text>
          <br></br>
          <Text fz="sm">
            Some hints and tips for your online usability test:
          </Text>
          <Text fz="sm">
            1. <b>We prefer that you don’t require participants to download and install your software on their own computers/devices and instead you provide them with access to suitable technology. Speak to the ethics team if this would prove necessary in your study;</b>
          </Text>
          <Text fz="sm">
            2. For <b>online</b> usability tests, decide if you will be able to share your screen, giving the participant control in order to interact with your system directly or whether your system would be best evaluated on the basis of a video of it in use – thereafter, complete the PIS accordingly;
          </Text>
          <Text fz="sm">
            3. Make sure that you carefully identify the tasks and measures you will record – e.g., what you will ask participants to do and what measures of usability you will record such as task completion time – so that you elicit the data you need/expect;  you will be required to submit this level of data with your application package and have thought about how you will present this to your participants;
          </Text>
          <Text fz="sm">
            4. Do not require participants to create accounts in order to complete your study as this could reveal personal information if they are not thinking – if account creation is required, give participants a dummy profile on which basis to engage in the activity; similarly, give the participants data aligned with any task rather than have them create or think up data on the fly as this will avoid you testing their imagination rather than your system and further protect against data leaks;
          </Text>
          <Text fz="sm">
            5. Do not ask any unnecessary questions during any discussion/interview elements of the session (including in relation to collection of personal data) – ethically, you should only ask questions for which there is strong justification;
          </Text>
          <Text fz="sm">
            6. Do not require participants to answer any given question in a pre- or post-test interview – they should be free to skip any question they are not comfortable answering and this should be reinforced to them at the start (see below); and
          </Text>
          <Text fz="sm">
            7. Ensure that you reconfirm agreement to record the session before starting and reiterate that participants are free to leave at any point as well to refuse to answer any question they are not comfortable answering.
          </Text>
          <br></br>
          <Text fz="sm" td="underline">
            You will need to submit a document containing the tasks, measures and any questions you will ask in your submission package for approval.
          </Text>
          <br></br>
          <Text fz="sm">
            IMPORTANT: Because audio/video recordings are considered to represent personally identifiable information, it is important that once you have created anonymised transcripts of the discussion (i.e., in which any identifiable references are redacted) you destroy the original recordings.  Participants should only be identified via a code in all such transcripts.
          </Text>
          <br></br>
          <br></br>
          <Text fw="500">
            And Finally...
          </Text>
          <br></br>
          <Text fz="sm">
            <b>You may NOT advertise, recruit or conduct your study until you are in receipt of ethical approval from the ethics team.</b>  Failure to comply with this may result in you being refused the right to use your data in your FYP and potentially be considered (and investigated) as an academic offence.
          </Text>
          <br></br>
          <br></br>
          <Text fw="500">
            Summary
          </Text>
          <br></br>
          <Text fz="sm">
            1. Complete and submit ethics application to your supervisor to sign including the documents for your study.
          </Text>
          <Text fz="sm">
            2. Once signed by your supervisor, submit the application to the ethics team for approval.
          </Text>
        </Paper>
      </Grid.Col>
    </Grid>
  )
}

// Protected page - checks the session on the server
export const getServerSideProps = async (ctx: GetServerSidePropsContext | { req: NextApiRequest; res: NextApiResponse; }) => {
  // create authenticated supabase client
  const supabase = createServerSupabaseClient(ctx)
  // checks if there is a session
  const {
      data: { session },
  } = await supabase.auth.getSession()

  if (!session)
      return {
          redirect: {
              destination: '/login',
              permanent: false,
          },
      }

  return {
      props: {
          initialSession: session,
          user: session.user,
      },
  }
}