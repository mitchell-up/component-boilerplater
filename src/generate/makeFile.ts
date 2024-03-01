import fs from 'fs-extra'
import path from 'path'
import { Config } from '../config/readConfig'
import { getBoilerPlates } from './boilerplate'

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
    makeFileObj(
      componentDir,
      `index.${configs.ext}`,
      getBoilerPlates('index.txt', componentName, configs.ext || 'ts'),
    ),
    makeFileObj(
      componentDir,
      `${componentName}.${configs.ext}x`,
      getBoilerPlates('NAME_REPLACED.txt', componentName, configs.ext || 'ts'),
    ),
    makeFileObj(
      componentDir,
      `${componentName}.test.${configs.ext}x`,
      getBoilerPlates(
        'NAME_REPLACED.test.txt',
        componentName,
        configs.ext || 'ts',
      ),
    ),
    makeFileObj(
      componentDir,
      `${componentName}.stories.${configs.ext}x`,
      getBoilerPlates(
        'NAME_REPLACED.stories.txt',
        componentName,
        configs.ext || 'ts',
      ),
    ),
  ]

  // Generate Files for the component
  files.forEach((file) => {
    fs.writeFileSync(file.path, file.contents)
  })
  console.log(`✅ All '${componentName}' boilerplates has been generated.`)

  // Add Component into index.ts
  const indexPath = outputDir + `/index.${configs.ext}`

  if (fs.existsSync(indexPath)) {
    const indexFile = fs.readFileSync(outputDir + `/index.${configs.ext}`)

    fs.writeFileSync(
      indexPath,
      indexFile +
        getBoilerPlates('index.txt', componentName, configs.ext || 'ts') +
        '\n',
    )
  } else {
    console.log(`❌ Components index file doesn't exist.`)
  }
}
