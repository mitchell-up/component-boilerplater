import { Command } from 'commander'
import fs from 'fs-extra'
import { FileContents, index, makeFileObj } from './fileContents'
import path from 'path'

const OUTPUT_BASE_DIR = path.join(__dirname, '../../src/components')

function createComponent(componentName: string) {
    const componentDir = `${OUTPUT_BASE_DIR}/${componentName}`
    fs.ensureDirSync(componentDir)

    const files: FileContents = [
        makeFileObj(componentDir, 'index.ts', index(componentName)),
    ]

    // Generate Files for the component
    files.forEach((file) => {
        fs.writeFileSync(file.path, file.contents)
    })

    // Add Component into index.ts
    const indexPath = OUTPUT_BASE_DIR + '/index.ts'
    const indexFile = fs.readFileSync(OUTPUT_BASE_DIR + '/index.ts')
    fs.writeFileSync(indexPath, indexFile + index(componentName) + '\n')

    console.log(`✅ All '${componentName}' boilerplates has been generated.`)
}

const program = new Command()

program
    .argument('<componentName>', 'Component name')
    .action((componentName) => {
        createComponent(componentName)
    })

program.parse(process.argv)
