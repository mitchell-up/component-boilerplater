import fs from 'fs-extra'
import path from 'path'
import { Config } from '../config/readConfig'
import { getBoilerPlate } from './boilerplate'

interface FileObj {
  path: string
  contents: string
}

type FileContents = FileObj[]

function makeOutputDir(basePath: string = '/') {
  const cwd = process.cwd()
  return path.join(cwd, basePath)
}

function makeFileObj(
  componentDir: string,
  fileName: string,
  contents: string,
): FileObj {
  return {
    path: `${componentDir}/${fileName}`,
    contents: contents,
  }
}

function getFileContents(
  dir: string,
  name: string,
  config: Config,
): FileContents {
  return [
    // index
    makeFileObj(
      dir,
      `index.${config.ext}`,
      getBoilerPlate('index.txt', name, config.ext),
    ),
    // Component
    makeFileObj(
      dir,
      `${name}.${config.ext}x`,
      getBoilerPlate('NAME_REPLACED.txt', name, config.ext),
    ),
    // Component.test
    makeFileObj(
      dir,
      `${name}.test.${config.ext}x`,
      getBoilerPlate('NAME_REPLACED.test.txt', name, config.ext),
    ),
    // Component.stories
    makeFileObj(
      dir,
      `${name}.stories.${config.ext}x`,
      getBoilerPlate('NAME_REPLACED.stories.txt', name, config.ext),
    ),
  ]
}

function generateNewFile(file: FileObj) {
  if (fs.existsSync(file.path)) {
    const errorMessage = `There is already a file in ${file.path}.`
    throw Error(errorMessage)
  }
  fs.writeFileSync(file.path, file.contents)
}

function generateIndexFile(path: string, contents: string) {
  if (fs.existsSync(path)) {
    const indexFile = fs.readFileSync(path)
    const renewed = indexFile + contents + '\n'

    return fs.writeFileSync(path, renewed)
  }

  fs.writeFileSync(path, contents)
  console.log(`💡 The index file for Components has been generated.`)
}

export function generateBoilerPlates(componentName: string, config: Config) {
  const outputDir = makeOutputDir(config.baseDir)

  const componentDir = `${outputDir}/${componentName}`

  fs.ensureDirSync(componentDir)

  const files = getFileContents(componentDir, componentName, config)

  // Generate Files for the component
  files.forEach((file) => {
    generateNewFile(file)
  })

  console.log(`✅ All '${componentName}' boilerplates has been generated.`)

  // Add Component into index
  const indexPath = outputDir + `/index.${config.ext}`
  const indexContents = getBoilerPlate('index.txt', componentName, config.ext)

  generateIndexFile(indexPath, indexContents)
}
