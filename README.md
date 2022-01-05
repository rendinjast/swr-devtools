<h1 align="center">react-query devtools for <a href="https://swr.vercel.app/">swr</a></h1>

![App screenshot](https://raw.githubusercontent.com/rendinjast/swr-devtools/master/main.png)

> under development

## Live Demo

[![swr-devtools](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/goofy-microservice-ehhkn)

## Installation

```bash
yarn add @rendinjast/swr-devtools
# or
npm i @rendinjast/swr-devtools
```

## Usage

```jsx
import SWRDevtools from '@rendinjast/swr-devtools'

export default function App({ Component, pageProps }) {
  return (
    <SWRDevtools>
      <Component {...pageProps} />
    </SWRDevtools>
  )
}
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

[MIT](./LICENSE)
