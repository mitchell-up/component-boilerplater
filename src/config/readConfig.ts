import fs from 'fs-extra'
import path from 'path'

export interface Config {
  baseDir?: string
  ext?: 'js' | 'ts'
}

const defaultConfig: Required<Config> = {
  baseDir: 'src/components',
  ext: 'ts',
}

function findConfigFile(fileName: string, rootDir = process.cwd()) {
  const filePath = path.join(rootDir, fileName)

  return fs.existsSync(filePath) ? filePath : null
}

export function readConfig(fileName: string): Required<Config> {
  const configFile = findConfigFile(fileName)

  if (!configFile) {
    return defaultConfig
  }

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
