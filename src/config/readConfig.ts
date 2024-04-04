import fs from 'fs-extra'
import path from 'path'

export interface Config {
  baseDir?: string
  ext?: 'js' | 'ts'
}

function findConfigFile(fileName: string, rootDir = process.cwd()) {
  const filePath = path.join(rootDir, fileName)

  if (!fs.existsSync(filePath)) {
    const errorMessage = `Failed to find config file. You need to make "${fileName}" in your root directory.`
    throw Error(errorMessage)
  }

  return filePath
}

export function readConfig(fileName: string): Required<Config> {
  const configFile = findConfigFile(fileName)

  const configString = fs.readFileSync(configFile, 'utf8')

  if (!configString) {
    throw Error(`Failed to read '${fileName}'`)
  }

  const parsedConfig = JSON.parse(configString) as Config

  return {
    baseDir: parsedConfig.baseDir || 'src/components',
    ext: parsedConfig.ext || 'ts',
  }
}
