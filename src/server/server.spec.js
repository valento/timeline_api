import should from 'should'
import server from './index.js'

describe('Sever', () => {

// test serverSettings:
  it('should require a repository to start', () => {
    return server.start({}).should.be.rejectedWith(Error)
  })

})
