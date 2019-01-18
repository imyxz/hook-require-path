const HookRequirePath = require('..')
const path = require('path')
describe('rule', function () {
  it('should could add rule', function () {
    const hookRequirePath = new HookRequirePath()
    hookRequirePath.addRule('~', '/aaa')
    hookRequirePath.addRule('@', 'bbb')
    hookRequirePath.addRule('-test', 'ccc/avx/ss')
    expect(hookRequirePath.rules.length).toBe(3)
    expect(hookRequirePath.rules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          prefix: '~/',
          dir: '/aaa'
        }),
        expect.objectContaining({
          prefix: '@/',
          dir: path.resolve(__dirname, 'bbb')
        }),
        expect.objectContaining({
          prefix: '-test/',
          dir: path.resolve(__dirname, 'ccc/avx/ss')
        })])
    )
  })
  it('should match right rule', function () {
    const hookRequirePath = new HookRequirePath()
    hookRequirePath.addRule('~', '/aaa')
    hookRequirePath.addRule('@', 'bbb')
    hookRequirePath.addRule('-test', 'ccc/avx/ss')
    expect(hookRequirePath.rules.length).toBe(3)
    expect(hookRequirePath.getPathMatchRule('~@/aaa')).toBe(null)
    expect(hookRequirePath.getPathMatchRule('~aaaa')).toBe(null)
    expect(hookRequirePath.getPathMatchRule('-/awef')).toBe(null)
    expect(hookRequirePath.getPathMatchRule('~/abc/ccc')).toEqual(expect.objectContaining({
      prefix: '~/',
      dir: '/aaa'
    }))
    expect(hookRequirePath.getPathMatchRule('@/bbb')).toEqual(expect.objectContaining({
      prefix: '@/',
      dir: path.resolve(__dirname, 'bbb')
    }))
    expect(hookRequirePath.getPathMatchRule('-test/abc/ccc')).toEqual(expect.objectContaining({
      prefix: '-test/',
      dir: path.resolve(__dirname, 'ccc/avx/ss')
    }))
  })
})
