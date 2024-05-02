<h1 align="center">🗂️<br/>Component Boilerplater</h1>
<h3 align="center">
  Don't manually create files for React Component, one by one
</h3>
<h3 align="center">
Just one command, you can get Component, Test, Stories automatically.
</h3>

<br/>

<br/>

## 🚀 Getting Started

### 01. Add Scripts

```js
{
  //..
  "scripts": {
    //..
    "gen": "gencb"
    //..
  }
  //..
}
```

### 02. Run Command with Component Name

```bash
npm run gen <Component Name>
```

<br/>

## Configurations

Make `boilerplate.config.json` in your root directory.

```js
{
  "baseDir": "/src/components", // Output directory
  "ext": "ts"                   // js | ts
}
```

<br/>

## What Can You Get?

You only need to prepare a component name for files. If you named some component 'Text', you can get below files in Text folder:

```bash
Text
├── index.ts
├── Text.tsx
├── Text.test.tsx
├── Text.stories.tsx
```

 <br/>

## Preview the files with component name 'Text'

### index.ts

```ts
export * from './Text'
```

### Component

```ts
export interface TextProps {}

export default function Text({}: TextProps) {
  return <div></div>
}
```

### Test

```ts
import { render } from '@testing-library/react'
import Text, { TextProps } from './Text'

const renderText = (props?: TextProps) => {
  return render(<Text {...props}></Text>)
}

describe('<Text/>', () => {
  test('Renders correctly', () => {})
})
```

### Stories

```ts
import { Meta, StoryObj } from '@storybook/react'
import Text from './Text'

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Text>

/**
 * Text
 */
export const TextDefault: Story = {
  name: 'Text',
}
```
