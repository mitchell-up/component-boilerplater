import fs from 'fs-extra'
import path from 'path'
import { Config } from '../config/readConfig'
import { generateIndexFile, generateNewFile, getFileContents } from './makeFile'
import { getBoilerPlate } from './boilerplate'

function makeOutputDir(basePath: string = '/') {
  const cwd = process.cwd()
  return path.join(cwd, basePath)
}

export function generateBoilerPlates(componentName: string, config: Config) {
  const outputDir = makeOutputDir(config.baseDir)

  const componentDir = `${outputDir}/${componentName}`

  fs.ensureDirSync(componentDir)

  // Add Component into index
  const indexPath = outputDir + `/index.${config.ext}`
  const indexContents = getBoilerPlate('index.txt', componentName, config.ext)

  generateIndexFile(indexPath, indexContents)

  const files = getFileContents(componentDir, componentName, config)

  // Generate Files for the component
  files.forEach((file) => {
    generateNewFile(file)
  })

  console.log(`✅ All '${componentName}' boilerplates has been generated.`)
}
