const HookRequirePath = require('..')
function getInstance () {
  const hookRequirePath = new HookRequirePath()
  hookRequirePath.addRule('~', 'test-modules/dir1')
  hookRequirePath.addRule('-', 'test-modules/dir2')
  hookRequirePath.addRule('@', './test-modules')
  return hookRequirePath
}
// should could install
try {
  const hookRequirePath = getInstance()
  hookRequirePath.install()
} catch (e) {
  console.error('should could install')
  throw e
}
console.log('√ should could install')
// should resolve correctly
try {
  const hookRequirePath = getInstance()
  hookRequirePath.install()
  const rootModuleA = require('@/module-a')
  const rootModuleB = require('@/module-b')
  const dir1ModuleA = require('~/module-a')
  const dir2ModuleA = require('-/module-a')
  if (rootModuleA.content !== 'root-module-a') {
    throw new Error()
  }
  if (rootModuleB.content !== 'root-module-b') {
    throw new Error()
  }
  if (dir1ModuleA.content !== 'dir1-module-a') {
    throw new Error()
  }
  if (dir2ModuleA.content !== 'dir2-module-a') {
    throw new Error()
  }
} catch (e) {
  console.error('should resolve correctly')
  throw e
}
console.log('√ should resolve correctly')
// should sub module resolve correctly
try {
  const hookRequirePath = getInstance()
  hookRequirePath.install()
  const module = require('~/inner-require')
  if (module.content !== 'dir2-module-a') {
    throw new Error()
  }
} catch (e) {
  console.error('should sub module resolve correctly')
  throw e
}
console.log('√ should sub module resolve correctly')
// should have cache
try {
  const hookRequirePath = getInstance()
  hookRequirePath.install()
  const randomA = require('@/random')
  const randomB = require('./test-modules/random')
  const randomC = require('~/../random')
  const randomD = require('-/../random')
  if (randomA !== randomB) {
    throw new Error()
  }
  if (randomA !== randomC) {
    throw new Error()
  }
  if (randomA !== randomD) {
    throw new Error()
  }
} catch (e) {
  console.error('should have cache')
  throw e
}
console.log('√ should have cache')
// should allow cyclic module
try {
  const hookRequirePath = getInstance()
  hookRequirePath.install()
  const circle1 = require('~/circle1')
  const circle2 = require('-/circle2')
  if (circle1.name !== 'circle1') {
    throw new Error()
  }
  if (circle2.name !== 'circle2') {
    throw new Error()
  }
  if (circle1.other.name !== 'circle2') {
    throw new Error()
  }
  if (circle2.other.name !== 'circle1') {
    throw new Error()
  }
} catch (e) {
  console.error('should allow cyclic module')
  throw e
}
console.log('√ should allow cyclic module')

// should could uninstall
try {
  const hookRequirePath = getInstance()
  hookRequirePath.install()
  const circle1 = require('~/circle1')
  hookRequirePath.uninstall()
  let error = null
  try {
    const tmp = require('~/circle1')
  } catch (e) {
    error = e
  }
  if (error === null) {
    throw new Error()
  }
} catch (e) {
  console.error('should could uninstall')
  throw e
}
console.log('√ should could uninstall')


console.log('√ all done')
