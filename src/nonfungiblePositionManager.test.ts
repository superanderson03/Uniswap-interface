{
  "name": "@uniswap/v3-sdk",
  "license": "MIT",
  "publishConfig": {
    "access": "public"
  },

  "description": "⚒️ An SDK for building applications on top of Uniswap V3",
  "main": "dist/index.js",
  "typings": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "repository": "https://github.com/Uniswap/uniswap-v3-sdk.git",
  "keywords": [
    "uniswap",
    "ethereum"
  ],
  "module": "dist/v3-sdk.esm.js",
  "scripts": {
    "build": "tsdx build",
    "start": "tsdx watch",
    "test": "tsdx test",
    "prepublishOnly": "tsdx build"
  },
  "dependencies": {
    "@ethersproject/abi": "^5.0.12",
    "@ethersproject/solidity": "^5.0.9",
    "@uniswap/sdk-core": "^3.0.1",

    "tiny-invariant": "^1.1.0",
    "tiny-warning": "^1.0.3"
  },
  "devDependencies": {
    "@types/jest": "^24.0.25",
    "@uniswap/v3-core": "1.0.0",
    "tsdx": "^0.14.1",
    "typedoc": "^0.20.36",
    "typedoc-plugin-markdown": "^3.7.2"
  },
  "engines": {
    "node": ">=10"
  },
  "prettier": {
    "printWidth": 120,
    "semi": false,
    "singleQuote": true
  }
}
