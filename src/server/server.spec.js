import should from 'should'
import server from './index.js'
import { createContainer } from 'awilix'

describe('Sever reboot', () => {

// test serverSettings:
// with should:
  it('container.resolve must be a function to start', () => {
    return server.start({}).should.be.rejectedWith(Error)
  })
// with jest:
  //test('Without Dependency Container must exit with error', () => {
  //  return expect(server.start({})).rejects.toThrow(/CONTAINER/)
  //})
  //test('Missing Repo/Port must exit with error', () => {
  //  return expect(server.start({})).rejects.toThrow(/REPO || PORT/)
  //})

})
