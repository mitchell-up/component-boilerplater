import { Command } from 'commander'
import { generateBoilerPlates } from './src/generate/makeFile'
import { readConfig } from './src/config/readConfig'

const CONFIG_FILENAME = 'boilerplate.config.json'

const program = new Command()

program
  .argument('<componentName>', 'Component name')
  .action((componentName) => {
    const configs = readConfig(CONFIG_FILENAME)

    generateBoilerPlates(componentName, configs)
  })

program.parse(process.argv)
