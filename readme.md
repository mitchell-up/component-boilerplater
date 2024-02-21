<h1 align="center">Component Boilerplater</h1>
<h3 align="center">
  Don't manually create files for React Component, one by one
</h3>
<h3 align="center">
Just one command, you can get Component, Test, Stories automatically.
</h3>
<br/>

## 🚀 Getting Started

## Configurations
Make `boilerplate.config.json` in your root directory.

```js
{
  "baseDir": "/src/components", // Output directory
  "ext": "ts"                   // js | ts
}
```

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

## Preview the files

### index.ts

```ts
export * from './NAME_REPLACED'
```

### Component

```ts
export interface NAME_REPLACEDProps {}

export default function NAME_REPLACED({}: NAME_REPLACEDProps) {
  return <div></div>
}
```

### Test

```ts
import { render } from '@testing-library/react'
import NAME_REPLACED, { NAME_REPLACEDProps } from './NAME_REPLACED'

const renderNAME_REPLACED = (props?: NAME_REPLACEDProps) => {
  return render(<NAME_REPLACED {...props}></NAME_REPLACED>)
}

describe('<NAME_REPLACED/>', () => {
  test('정상적으로 렌더링 된다.', () => {})
})
```

### Stories

```ts
import { Meta, StoryObj } from '@storybook/react'
import NAME_REPLACED from './NAME_REPLACED'

const meta: Meta<typeof NAME_REPLACED> = {
  title: 'Components/NAME_REPLACED',
  component: NAME_REPLACED,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof NAME_REPLACED>

/**
 * NAME_REPLACED
 */
export const NAME_REPLACEDDefault: Story = {
  name: 'NAME_REPLACED',
}

```


