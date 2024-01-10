import { Command } from 'commander'
import { generateBoilerPlate } from './makeFile'
import { readConfig } from './readConfig'

const program = new Command()

program
    .argument('<componentName>', 'Component name')
    .action((componentName) => {
        readConfig()
        //generateBoilerPlate(componentName)
    })

program.parse(process.argv)
