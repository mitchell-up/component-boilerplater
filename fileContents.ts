import fs from 'fs-extra'
interface FileObj {
    path: fs.PathOrFileDescriptor
    contents: string
}
export type FileContents = FileObj[]
export function makeFileObj(
    componentDir: string,
    fileName: string,
    contents: string,
): FileObj {
    return {
        path: `${componentDir}/${fileName}`,
        contents: contents,
    }
}

/**
 * index.ts
 */
export const index = (name: string) => `export * from './${name}'`