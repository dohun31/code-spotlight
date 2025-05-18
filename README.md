# react-code-focus

React components for code focus functionality.

## Installation

```bash
npm install react-code-focus
# or
yarn add react-code-focus
# or
pnpm add react-code-focus
```

## Usage

```jsx
import { CodeFocusProvider, CodeFocus, CodeToken } from "react-code-focus";

function App() {
  return (
    <CodeFocusProvider>
      <CodeFocus>
        <CodeToken>Hello</CodeToken>
        <CodeToken>World</CodeToken>
      </CodeFocus>
    </CodeFocusProvider>
  );
}
```

## API

### `CodeFocusProvider`

Context provider for code focus functionality.

### `CodeFocus`

Wrapper component for code focus functionality.

#### Props

- `children` (ReactNode): Child components
- `className` (string, optional): Additional class name

### `CodeToken`

Token component for code focus functionality.

#### Props

- `children` (ReactNode): Child components
- `className` (string, optional): Additional class name

## License

MIT
