import fs from 'fs-extra'
import path from 'path'

export interface Config {
  baseDir?: string
  ext?: 'js' | 'ts'
}

function findConfigFile(fileName: string, rootDir = process.cwd()) {
  const filePath = path.join(rootDir, fileName)

  if (!fs.existsSync(filePath)) {
    throw Error('No exist file path.')
  }
  
  return filePath
}

export function readConfig(fileName: string) {
  const configFile = findConfigFile(fileName);  

  const configString = fs.readFileSync(configFile, 'utf8')

  if (!configString) {
    throw Error(`Failed to read '${fileName}'`)
  }

  return JSON.parse(configString) as Config
}