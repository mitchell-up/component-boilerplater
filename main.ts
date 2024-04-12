import { Command } from 'commander'
import { readConfig } from './src/config/readConfig'
import { generateBoilerPlates } from './src/generate/generateBoilerPlates'
import packageJson from './package.json'

const CONFIG_FILENAME = 'boilerplate.config.json'

const program = new Command()

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version)

program
  .argument('<componentName>', 'Component name')
  .option('--js', 'Use JavaScript Extentions.')
  .option('-d, --dir <path>', 'Output directory the files will be generated.')
  .action((componentName, options) => {
    const configs = readConfig(CONFIG_FILENAME)

    if (options.js) {
      configs.ext = 'js'
    }

    if (options.dir) {
      configs.baseDir = options.dir
    }

    generateBoilerPlates(componentName, configs)
  })

program.parse(process.argv)
