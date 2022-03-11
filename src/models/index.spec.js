import foo from './index.js'

describe('Schema Validator', () => {

  test('Must validate User Object', () => {

    const testObject = {
      name: 'Valio',
      password: 'lalala4'
    }

    return expect( foo.validate(testObject,'user') ).rejects.toThrow(/email|password/)
  })

})
