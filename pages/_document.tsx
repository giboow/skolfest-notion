import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="body">
        <header className="header">
          Header
        </header>
        <div className="content">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  )
}
