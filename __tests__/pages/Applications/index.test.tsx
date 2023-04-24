import React from 'react'
import "jest-fix-undefined"
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Application from '../../../pages/applications'
import userEvent from '@testing-library/user-event'


describe('student application page', () => {
    it('checks route switches to complete-applications page', async () => {
        render(<Application />)
        userEvent.click(screen.getByRole('button', { name: /edit/i }))
        await screen.findAllByRole('button', {name: /Submit to Supervisor/i})
    })
})