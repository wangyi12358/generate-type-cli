#!/usr/bin/env node
'use strict';
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const pkg = require('../package.json')

const arg = hideBin(process.argv)
const cli = yargs(arg)

const args = cli
  .version(pkg.version)
  .usage('Usage: proto2ts <options>')
  .alias('h', 'help')
  .alias('v', 'version')
  .help()
  .option('debug', {
    type: 'boolean',
    desc: 'load code with ts-node for debug',
  })
  .option('dir', {
    alias: ['d'],
    type: 'string',
    requiresArg: true,
    desc: 'directory address of Protocol Buffers'
  })
  .option('output', {
    alias: ['o'],
    type: 'string',
    desc: 'output api path',
    default: './'
  })
  .option('omitApiPrefix', {
    type: 'string',
    desc: 'Omit api prefix path'
  })
  .option('apiPrefix', {
    type: 'string',
    desc: 'api prefix path, Please enter at the beginning /'
  })
  .option('requestName', {
    type: 'string',
    default: 'request',
    desc: 'the request name'
  })
  .option('requestPath', {
    type: 'string',
    default: 'umi',
    desc: 'the request path'
  })
  .strict()
  .argv

if (args.debug) {
  require('ts-node/register');
  const { main } = require('../src/index')
  main(args)
} else {
  const { main } = require('../dist/index')
  main(args)
}
