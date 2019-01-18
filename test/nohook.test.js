describe('nohook', function () {
  it('should have cache', function () {
    const random_a = require('./test-modules/random')
    const random_b = require('./test-modules/random')
    expect(random_a).toBe(random_b)
  })
  it('should import correct module', function () {
    const moudle_a = require('./test-modules/module-a')
    expect(moudle_a.content).toBe('root-module-a')
    const moudle_b = require('./test-modules/module-b')
    expect(moudle_b.content).toBe('root-module-b')
  })
})
