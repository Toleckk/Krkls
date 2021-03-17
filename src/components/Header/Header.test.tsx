import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import {short} from '../../utils'
import {Header, HeaderProps} from './Header'

describe('Header', () => {
  const defaultProps: HeaderProps = {
    lvl: {lvl: 1, exp: 1},
    requiredLvl: {lvl: 1, exp: 5},
  }

  it('should render not disabled undo button if isUndoDisabled is false', () => {
    const container = render(<Header {...defaultProps} isUndoDisabled={false} />)
    const button = container.getByRole('button', {name: 'Назад'})

    expect(button).not.toBeDisabled()
  })

  it('should render disabled undo button if isUndoDisabled is true', () => {
    const container = render(<Header {...defaultProps} isUndoDisabled />)
    const button = container.getByRole('button', {name: 'Назад'})

    expect(button).toBeDisabled()
  })

  it('should call onUndo on undo button click', () => {
    const onUndo = jest.fn()

    const container = render(<Header {...defaultProps} onUndo={onUndo} />)
    const button = container.getByRole('button', {name: 'Назад'})

    fireEvent.click(button)

    expect(onUndo).toBeCalled()
  })

  it('should render not disabled redo button if isRedoDisabled is false', () => {
    const container = render(<Header {...defaultProps} isRedoDisabled={false} />)
    const button = container.getByRole('button', {name: 'Вперёд'})

    expect(button).not.toBeDisabled()
  })

  it('should render disabled redo button if isRedoDisabled is true', () => {
    const container = render(<Header {...defaultProps} isRedoDisabled />)
    const button = container.getByRole('button', {name: 'Вперёд'})

    expect(button).toBeDisabled()
  })

  it('should call onRedo on redo button click', () => {
    const onRedo = jest.fn()

    const container = render(<Header {...defaultProps} onRedo={onRedo} />)
    const button = container.getByRole('button', {name: 'Вперёд'})

    fireEvent.click(button)

    expect(onRedo).toBeCalled()
  })

  it('should call onReset on reset button click', () => {
    const onReset = jest.fn()

    const container = render(<Header {...defaultProps} onReset={onReset} />)
    const button = container.getByRole('button', {name: 'Сбросить'})

    fireEvent.click(button)

    expect(onReset).toBeCalled()
  })

  it('should call onCopy on copy button click', () => {
    const onCopy = jest.fn()

    const container = render(<Header {...defaultProps} onCopy={onCopy} />)
    const button = container.getByRole('button', {name: 'Копировать ссылку'})

    fireEvent.click(button)

    expect(onCopy).toBeCalled()
  })

  it('should render current lvl value', () => {
    const lvl = 1337
    const container = render(<Header {...defaultProps} lvl={{lvl, exp: 1338}} />)

    expect(container.getByText(lvl)).toBeInTheDocument()
  })

  it('should render required lvl value', () => {
    const lvl = 1337
    const container = render(<Header {...defaultProps} requiredLvl={{lvl, exp: 1338}} />)

    expect(container.container).toHaveTextContent(String(lvl))
  })

  test.each<number>([10, 15, 1000, 100000000, 123456789, 9234223233])(
    'should render shorted current exp',
    exp => {
      const container = render(<Header {...defaultProps} requiredLvl={{lvl: 1338, exp}} />)

      expect(container.container).toHaveTextContent(short(exp))
    },
  )
})
