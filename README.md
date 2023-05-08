# Generate-type-cli docs

## Feature
- Generate interface and type files based on proto files

## Quick start
```shell
$ npm install -g generate-type-cli

$ generate-type-cli -d ./xxx.proto
```
## Command args
```
Usage: proto2api [options]

Convert proto file to api file

Options:
Options:
  -V, --version             output the version number
  --debug                   Use in development mode, use ts-node to run the files under src
  -d, --dir <string>        proto directory or file, if it is a directory, file scanning will be performed, and all files under this directory will be compiled
  -o, --output <string>     输出路径(default: "./")
  --reqeustName <type>      Request name (default: "request")
  --reqeustPath <type>      Request path (default: "umi")
  --apiPrefix <string>      Api prefix path (default: "")
  --moitApiPrefix <string>  Omit api prefix path (default: "")
  -h, --help                Display help for command
```

## Publish
```shell
$ make publish
```
