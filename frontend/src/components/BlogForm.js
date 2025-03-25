import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
            title:
        <input
          id="title"
          type="text"
          value={newTitle}
          name="Title"
          onChange={event => setNewTitle(event.target.value)}
        />
      </div>
      <div>
            author:
        <input
          id="author"
          type="text"
          value={newAuthor}
          name="Author"
          onChange={event => setNewAuthor(event.target.value)}
        />
      </div>
      <div>
            url:
        <input
          id="url"
          type="text"
          value={newUrl}
          name="Url"
          onChange={event => setNewUrl(event.target.value)}
        />
      </div>
      <button id="create_blog" type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm