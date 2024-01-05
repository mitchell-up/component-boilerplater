/**
 * index.ts
 */
export const index = (name: string) => `export * from './${name}'`
/**
 * Component.tsx
 */
export const component = (name: string) =>
    `export interface ${name}Props {

}

export default function ${name}({  }: ${name}Props) {
    return <div></div>
}`

/**
 * Component.test.tsx
 */
export const test = (name: string) =>
    `import { render } from '@testing-library/react'
import ${name}, { ${name}Props } from './${name}'

const render${name} = (props?: ${name}Props) => {
    return render(
        <${name} {...props}></${name}>
    )
}

describe('<${name}/>', () => {
    test('정상적으로 렌더링 된다.', () => {})
})`

/**
 * Component.stories.tsx
 */
export const stories = (name: string) =>
    `import { Meta, StoryObj } from '@storybook/react'
import ${name} from './${name}'

const meta: Meta<typeof ${name}> = {
    title: 'Components/${name}',
    component: ${name},
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ${name}>

/**
 * ${name}
 */
export const ${name}Default: Story = {
    name: '${name}',
}`
