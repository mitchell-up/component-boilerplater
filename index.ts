import { Command } from 'commander'
import { generateBoilerPlate } from './makeFile'
import { readConfig } from './readConfig'

const CONFIG_FILENAME = 'boilerplate.config.json'

const program = new Command()

program
  .argument('<componentName>', 'Component name')
  .action((componentName) => {
    const configs = readConfig(CONFIG_FILENAME)
    console.log('💡', configs)

    generateBoilerPlate(componentName, configs)
  })

program.parse(process.argv)
