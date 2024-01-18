import fs from 'fs-extra'
import { component, index, stories, test } from './fileContents'
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

  const files: FileContents = [
    makeFileObj(componentDir, 'index.ts', index(componentName)),
    makeFileObj(componentDir, `${componentName}.tsx`, component(componentName)),
    makeFileObj(componentDir, `${componentName}.test.tsx`, test(componentName)),
    makeFileObj(
      componentDir,
      `${componentName}.stories.tsx`,
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
