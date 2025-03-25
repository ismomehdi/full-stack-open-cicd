import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const input = screen.getAllByRole('textbox')
  const submitButton = screen.getByText('create')

  await user.type(input[0], 'testing a form...')
  await user.type(input[1], 'testing a form...')
  await user.type(input[2], 'testing a form...')

  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  const expected = {
    title: 'testing a form...',
    author: 'testing a form...',
    url: 'testing a form...'
  }

  expect(createBlog.mock.calls[0][0]).toStrictEqual(expected)
})
