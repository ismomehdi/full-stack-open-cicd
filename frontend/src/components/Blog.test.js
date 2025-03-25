import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Test title',
  author: 'Test author',
  url: 'Test url',
  likes: 0,
}

test('renders title', () => {
  render(<Blog blog={blog} />)
  const regex = new RegExp(blog.title)
  screen.getByText(regex)
})

test('renders url, likes and user when view button is clicked', async () => {
  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = new RegExp(blog.url)
  const likes = new RegExp(blog.likes)
  const username = new RegExp('unknown')

  screen.getByText(url)
  screen.getByText(likes)
  screen.getByText(username)
})

test('event handler is called twice if like button is clicked 2 times', async () => {
  const mockHandler = jest.fn()

  render(<Blog blog={blog} updateBlog={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})