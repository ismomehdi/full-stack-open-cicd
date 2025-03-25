describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'test',
      password: 'test'
    }
    const user2 = {
      username: 'test2',
      password: 'test2'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
      cy.contains('test logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('wrong password')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'test' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create_blog').click()
      cy.contains('test title')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'test title',
          author: 'test author',
          url: 'test url'
        })
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('A blog can be deleted', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'test title')
      })

      it('Another user does not see the blog remove button', function() {
        cy.contains('logout').click()

        cy.get('#username').type('test2')
        cy.get('#password').type('test2')
        cy.get('#login-button').click()

        cy.contains('view').click()
        cy.get('#remove').should('not.be.visible')
      })

      it('Blogs are ordered by likes', function() {
        cy.createBlog({
          title: 'test title 2',
          author: 'test author 2',
          url: 'test url 2'
        })

        cy.createBlog({
          title: 'test title 3',
          author: 'test author 3',
          url: 'test url 3'
        })


        cy.get('.blog').then(blog => {
          cy.wrap(blog[1]).contains('view').click()
          cy.wrap(blog[1]).contains('like').click()
        })

        cy.get('.blog').eq(0).should('contain', 'test title 2')

        cy.get('.blog').then(blog => {
          cy.wrap(blog[2]).contains('view').click()
          cy.wrap(blog[2]).contains('like').click()
          cy.wait(500)
          cy.wrap(blog[2]).contains('like').click()
        })

        cy.get('.blog').eq(0).should('contain', 'test title 3')
      })

    })
  })
})