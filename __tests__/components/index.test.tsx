import React from 'react'
import "jest-fix-undefined"
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Navbar from '../../components/NavbarComponent'

describe('check components', () => {
    it('checks route switches to login page', async () => {
        render(<Navbar />)
        userEvent.click(screen.getByRole('button', { name: /Login/i }))
        await screen.findAllByText('Login')
    })

    // it('checks route switches to Home page', async () => {
    //     render(<Navbar />)
    //     userEvent.click(screen.getByRole('button', { name: /Home/i }))
    //     await screen.findAllByText('General Overview of Acceptable Projects')
    // })

    it('checks route switches to FAQ page', async () => {
        render(<Navbar />)
        userEvent.click(screen.getByRole('button', { name: /FAQs/i }))
        await screen.findAllByText('Frequently Asked Questions')
    })

    it('checks route switches to FAQ page', async () => {
        render(<Navbar />)
        userEvent.click(screen.getByRole('button', { name: /Applications/i }))
        await screen.findAllByText('Create Ethics Application')
    })
})