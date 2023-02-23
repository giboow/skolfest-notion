import { Html, Head, Main, NextScript } from 'next/document'
import Image from 'next/image'



export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="body">
        <header className="header">
          <div className="header__content">
            <nav className="flex items-center justify-between flex-wrap ">
              <div className="header__content">
                <a className="flex flex-row items-center" href="/">
                  <Image width="100" height="100" src="/images/logo_skolfest.png" alt="logo" />
                  <div className="pl-4">
                    <div className="header__brand">Skolfest
                    </div>
                    <div className="header__description">
                      APE  de l'école primaire Henri Guérin à Bain de Bretagne
                    </div>
                  </div>
                </a>
              </div>
            </nav>
          </div>
        </header>
        <main className="content">
          <Main />
          <NextScript />
        </main>
      </body>
    </Html>
  )
}
