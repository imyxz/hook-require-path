'use strict'
const Module = require('module')
const path = require('path')
const originResolveFilename = Module._resolveFilename
module.exports = class HookRequirePath {
  constructor () {
    this.rules = []
  }
  getPathMatchRule (_path) {
    for (let { prefix, dir } of this.rules) {
      if (_path.substr(0, prefix.length) === prefix) {
        return {
          prefix, dir
        }
      }
    }
    return null
  }
  addRule (prefix, dir) {
    if (!path.isAbsolute(dir)) {
      dir = path.resolve(path.dirname(require.main.filename), dir)
    }
    prefix = prefix + '/'
    this.rules.push({
      prefix,
      dir
    })
  }
  install () {
    const that = this
    Module._resolveFilename = function (request, parent) {
      const matchedRule = that.getPathMatchRule(request)
      if (matchedRule !== null) {
        const pathWithoutPrefix = request.substr(matchedRule.prefix.length)
        const targetPath = path.resolve(matchedRule.dir, pathWithoutPrefix)
        return require.resolve(targetPath)
      } else {
        return originResolveFilename.apply(this, arguments)
      }
    }
  }
  uninstall () {
    Module._resolveFilename = originResolveFilename
  }
}
