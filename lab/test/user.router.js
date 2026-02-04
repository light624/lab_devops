const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../src/dbClient')

chai.use(chaiHttp)

describe('User REST API', () => {
  
    beforeEach(() => {
      // Clean DB before each test
      db.flushdb()
    })
    
    after(() => {
      app.close()
      db.quit()
    })

  describe('POST /user', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'jeanjireh',
        firstname: 'Jean',
        lastname: 'Jireh'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('pass wrong parameters', (done) => {
      const user = {
        firstname: 'Jean',
        lastname: 'Jireh'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })

  describe('GET /user/:username', () => {
    
    it('successfully get user', (done) => {
      const user = {
        username: 'jeanjireh',
        firstname: 'Jean',
        lastname: 'Jireh'
      }
      
      db.hmset(user.username, user, (err, res) => {
        chai.request(app)
          .get('/user/jeanjireh')
          .end((err, res) => {
             if (err) return done(err)

             chai.expect(res).to.have.status(200)
             chai.expect(res.body.firstname).to.equal('Jean')
             done()
          })
      })
    })

    it('cannot get a user when it does not exist', (done) => {
      chai.request(app)
        .get('/user/introuvable')
        
        .end((err, res) => {
          if (err) return done(err)
          chai.expect(res).to.have.status(404)
          done()
        })
    })
  })

  
})
