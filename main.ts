import { Command } from 'commander'
import { readConfig } from './src/config/readConfig'
import { generateBoilerPlates } from './src/generate/generateBoilerPlates'

const CONFIG_FILENAME = 'boilerplate.config.json'

const program = new Command()

program
  .argument('<componentName>', 'Component name')
  .action((componentName) => {
    const configs = readConfig(CONFIG_FILENAME)

    generateBoilerPlates(componentName, configs)
  })

program.parse(process.argv)
