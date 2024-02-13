/**
 * index
 */
export const index = (name: string) => `export * from './${name}'`

/**
 * Component
 */
export const component = (name: string) =>
    `export default function ${name}({  }) {
    return <div></div>
}`

/**
 * Component.test
 */
export const test = (name: string) =>
    `import { render } from '@testing-library/react'
import ${name} from './${name}'

const render${name} = (props) => {
    return render(
        <${name} {...props}></${name}>
    )
}

describe('<${name}/>', () => {
    test('정상적으로 렌더링 된다.', () => {})
})`

/**
 * Component.stories
 */
export const stories = (name: string) =>
    `import ${name} from './${name}'

const meta = {
    title: 'Components/${name}',
    component: ${name},
    tags: ['autodocs'],
}

export default meta

/**
 * ${name}
 */
export const ${name}Default = {
    name: '${name}',
}`
