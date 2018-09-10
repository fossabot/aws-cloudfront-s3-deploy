/* eslint-disable max-len,no-console */
const program = require('commander');
const chalk = require('chalk');
const deploy = require('./index');

program
  .version('1.0.0')
  .option('-p, --path <required>', 'path')
  .option('-b, --bucket <required>', 'bucket name')
  .option('-d, --distribution [id]', 'cloudfront distribution id')
  .option('-p, --profile [profile name]', 'profile to use')
  .option('-V, --verbose', 'run in verbose mode')
  .parse(process.argv);

if (program.path && program.bucketName) {
  deploy(program.path, program.bucketName, program.distributuon, program.profile, program.verbose, true).then((msg) => {
    console.log(chalk.greenBright(msg));
  }).catch((e) => {
    console.log(chalk.bold.red(e));
  });
} else {
  program.outputHelp();
}
