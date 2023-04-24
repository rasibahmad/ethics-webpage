import React from 'react'
import "jest-fix-undefined"
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import FAQ from '../../../pages/FAQ'
import userEvent from '@testing-library/user-event'


describe('checks FAQ page', () => {
    it('should render heading', () => {
        render (<FAQ />);
        const header = screen.getByRole('heading')
        const headerText = 'Frequently Asked Questions'
        expect(header).toHaveTextContent(headerText)
    })
    
})