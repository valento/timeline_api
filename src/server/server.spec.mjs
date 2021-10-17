import server from './index.js'

describe('Sever', () => {

// test serverSettings:
  it('should require a repo to start', ()=>{
    return serever.start({}).should.be.rejectedWith(/port/)
  })

})
