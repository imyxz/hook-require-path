# hook-require-path

Module path prefix alias for node.

![](https://img.shields.io/npm/v/hook-require-path.svg) 

# Quick example

```javascript
// index.js
const HookRequirePath = require('hook-require-path')
const hookRequirePath = new HookRequirePath()
hookRequirePath.addRule('@', '.')
hookRequirePath.addRule('~', './src')
hookRequirePath.install()
// require a module located at ./module-a
const moduleA = require('@/module-a')
//require a module located at ./src/module-b
const moduleB = require('~/module-b')
```

```javascript
// src/module-b.js
// Once install in project entry, alias could be used in required module without install again.
module.exports = require('@/module-a') //same as require('../module-a')
```

# Automatic completion in VS Code

![image](https://raw.githubusercontent.com/imyxz/hook-require-path/master/img/vscode.gif)

It is possible to enable automatic completion when using alias

Create a file `jsconfig.json` in your project root directory, and add following options

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"],
      "@/*": ["./*"]
    }
  }
}
```

Example above is for following rules, you should modify it according to your rules.

```javascript
hookRequirePath.addRule('@', '.')
hookRequirePath.addRule('~', './src')
```

# API

### `addRule(prefix, dir)`

#### prefix: String

the alias. would only match the `prefix` following by `/`. 

For example, if prefix is `@@`, then would match the path `@@/path/to/module`, but `@@path/to/module` would not be matched.

#### dir: String

the corresponding path.

If `dir` is not an absolute path, it use the project entry file path as the workdir.

```javascript
if (!path.isAbsolute(dir)) {
      dir = path.resolve(path.dirname(require.main.filename), dir)
    }
```

### `install()`

install the hook.

### `uninstall()`

uninstall the hook.

# test

```bash
npm run test
node test/install.manual-test.js
```