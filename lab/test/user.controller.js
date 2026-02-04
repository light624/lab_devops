const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {
  
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })

  describe('Create', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'jeanjireh',
        firstname: 'Jean',
        lastname: 'Jireh'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Jean',
        lastname: 'Jireh'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    // it('avoid creating an existing user', (done)=> {
    //   // TODO create this test
    //   // Warning: the user already exists
    //   done()
    // })
  })
  
  describe('Get', () => {
    
    it('get a user by username', (done) => {
      
      const user = {
        username: 'jeanjireh',
        firstname: 'Jean',
        lastname: 'Jireh'
      }
      db.hmset(user.username, user, (err, res) => {
        
        userController.get(user.username, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.deep.equal(user)
          done()
        })
      })
    })

    it('cannot get a user when it does not exist', (done) => {
      userController.get('nonexistentuser', (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal(null) 
        done()
      })
    })
  
   // TODO Create test for the get method
  // describe('Get', ()=> {
  //   
  //   it('get a user by username', (done) => {
  //     // 1. First, create a user to make this unit test independent from the others
  //     // 2. Then, check if the result of the get method is correct
  //     done()
  //   })
  //
  //   it('cannot get a user when it does not exist', (done) => {
  //     // Chech with any invalid user
  //     done()
  //   })
  //
  // })

  })

 
})
