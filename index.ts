import { Command } from 'commander'
import { generateBoilerPlate } from './makeFile'

const program = new Command()

program
    .argument('<componentName>', 'Component name')
    .action((componentName) => {
        generateBoilerPlate(componentName)
    })

program.parse(process.argv)
