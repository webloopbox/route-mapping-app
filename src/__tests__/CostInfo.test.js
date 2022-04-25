import { render, screen, cleanup } from '@testing-library/react'
import "@testing-library/jest-dom"
import CostInfo from "../components/CostInfo"

test('shoud render app component', () => {
    render(<CostInfo />)
    const searchInput = screen.getByTestId("term")
    expect(searchInput).toBeInTheDocument()
    const pText = screen.getByTestId("message")
    expect(pText).toHaveTextContent("text for")
})