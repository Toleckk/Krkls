import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import {Drawer, DrawerPlacement} from './Drawer'

describe('Drawer', () => {
  it('should render anything if show is false', () => {
    const container = render(
      <Drawer show={false}>
        <div />
      </Drawer>,
    )

    return expect(container.container).toBeEmptyDOMElement()
  })

  it('should render div with role dialog if show is true', async () => {
    const container = render(<Drawer show={true} />)

    const drawer = container.getByRole('dialog', {name: 'drawer'})

    expect(drawer).toBeInTheDocument()
  })

  it('should render children when show is true', () => {
    const childId = 'child'
    const container = render(
      <Drawer show={true}>
        <div data-testid={childId} />
      </Drawer>,
    )

    expect(container.getByTestId(childId)).toBeInTheDocument()
  })

  it('should call onHide on mask click', () => {
    const onHide = jest.fn()
    const container = render(<Drawer show={true} onHide={onHide} />)

    const mask = container.getByRole('presentation', {name: 'mask'})

    fireEvent.click(mask)

    expect(onHide).toBeCalled()
  })

  test.each<DrawerPlacement>(['right', 'left', 'top', 'bottom'])(
    'should add placement class',
    placement => {
      const container = render(<Drawer show={true} placement={placement} />)

      const styledElement = container.container.querySelector(`*[class~=${placement}]`)

      expect(styledElement).toBeDefined()
    },
  )

  it('should hide content only after transition end', () => {
    const childId = 'child'

    const container = render(
      <Drawer show={true}>
        <div data-testid={childId} />
      </Drawer>,
    )

    container.rerender(
      <Drawer show={false}>
        <div data-testid={childId} />
      </Drawer>,
    )

    expect(container.getByTestId(childId)).toBeInTheDocument()

    fireEvent.transitionEnd(container.getByRole('dialog', {name: 'drawer'}))
    return expect(container.findByTestId(childId)).rejects.toBeDefined()
  })

  it('should cache last child on close', () => {
    const childId = 'child'

    const container = render(
      <Drawer show={true}>
        <div data-testid={childId} />
      </Drawer>,
    )

    container.rerender(<Drawer show={false}>{null}</Drawer>)

    expect(container.getByTestId(childId)).toBeInTheDocument()
  })
})
