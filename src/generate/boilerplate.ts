import { readFileSync } from 'fs-extra'
import path from 'path'

type BoilerPlateContents =
  | 'index.txt'
  | 'index.txt'
  | 'NAME_REPLACED.jsx'
  | 'NAME_REPLACED.stories.jsx'
  | 'NAME_REPLACED.test.jsx'
  | 'NAME_REPLACED.txt'
  | 'NAME_REPLACED.stories.txt'
  | 'NAME_REPLACED.test.txt'

const IDENTIFIER = 'NAME_REPLACED'

export function makeBoilerPlate(
  path: string,
  name: string,
  identifier = IDENTIFIER,
) {
  const contents = readFileSync(path, 'utf-8')
  return contents.replaceAll(identifier, name)
}

export function getBoilerPlates(
  fileName: BoilerPlateContents,
  replaceName: string,
  ext: 'js' | 'ts' = 'ts',
) {
  const contentsPath = path.join(`../contents/${ext}/${fileName}`)
  return makeBoilerPlate(contentsPath, replaceName)
}
