import {fireEvent, render} from '@testing-library/react'
import {Alert} from './Alert'

describe('Alert', () => {
  it('should render children', () => {
    const childId = 'child'
    const container = render(
      <Alert>
        <div data-testid={childId} />
      </Alert>,
    )

    expect(container.getByTestId(childId)).toBeInTheDocument()
  })

  it('should call onHide on transition end', () => {
    const onHide = jest.fn()
    const container = render(<Alert onHide={onHide} />)

    fireEvent.transitionEnd(container.getByRole('alert'))

    expect(onHide).toBeCalled()
  })

  it('should call onHide on click', () => {
    const onHide = jest.fn()
    const container = render(<Alert onHide={onHide} />)

    fireEvent.click(container.getByRole('alert'))

    expect(onHide).toBeCalled()
  })

  it('should add "disappearing" className after half delay', () => {
    const delay = 3000

    jest.useFakeTimers()

    const container = render(<Alert delay={delay} />)
    const alert = container.getByRole('alert')

    expect(alert).not.toHaveClass('disappearing')

    jest.runTimersToTime(delay / 2)

    expect(alert).toHaveClass('disappearing')
  })
})
