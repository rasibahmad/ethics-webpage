import React from 'react'
import "jest-fix-undefined"
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from '../../../pages/login/index'
import userEvent from '@testing-library/user-event'


describe('login page', () => {
    it('checks route switches to Home page', async () => {
        render(<Login />)
        userEvent.click(screen.getByRole('button', { name: /Login/i }))
        await screen.findAllByText('Guides & Templates')
    })
})