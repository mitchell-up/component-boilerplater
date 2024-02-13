import fs from 'fs-extra'
import * as TSContents from './fileContents'
import * as JSContents from './jsContents'
import path from 'path'
import { Config } from './readConfig'

interface FileObj {
  path: fs.PathOrFileDescriptor
  contents: string
}

type FileContents = FileObj[]

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

function makeOutputDir(basePath: string = '/') {
  const cwd = process.cwd()
  return path.join(cwd, basePath)
}

export function generateBoilerPlate(componentName: string, configs: Config) {
  const outputDir = makeOutputDir(configs.baseDir)

  const componentDir = `${outputDir}/${componentName}`

  fs.ensureDirSync(componentDir)

  const { index, component, test, stories } =
    configs.ext === 'ts' ? TSContents : JSContents

  const files: FileContents = [
    makeFileObj(componentDir, `index.${configs.ext}`, index(componentName)),
    makeFileObj(
      componentDir,
      `${componentName}.${configs.ext}x`,
      component(componentName),
    ),
    makeFileObj(
      componentDir,
      `${componentName}.test.${configs.ext}x`,
      test(componentName),
    ),
    makeFileObj(
      componentDir,
      `${componentName}.stories.${configs.ext}x`,
      stories(componentName),
    ),
  ]

  // Generate Files for the component
  files.forEach((file) => {
    fs.writeFileSync(file.path, file.contents)
  })

  // Add Component into index.ts
  const indexPath = outputDir + '/index.ts'
  const indexFile = fs.readFileSync(outputDir + '/index.ts')
  fs.writeFileSync(indexPath, indexFile + index(componentName) + '\n')

  console.log(`✅ All '${componentName}' boilerplates has been generated.`)
}
