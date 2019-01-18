'use strict'
const Module = require('module')
const path = require('path')
const originResolveFilename = Module._resolveFilename
function getPathMatchRule (_path, rules) {
  for (let { prefix, dir } of rules) {
    if (_path.substr(0, prefix.length) === prefix) {
      return {
        prefix, dir
      }
    }
  }
  return null
}
module.exports = class HookRequirePath {
  constructor () {
    this.rules = []
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
    const rules = this.rules
    Module._resolveFilename = function (request, parent) {
      const matchedRule = getPathMatchRule(request, rules)
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
