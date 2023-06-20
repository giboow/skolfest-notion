import { Html, Head, Main, NextScript } from 'next/document'
import Image from 'next/image'



export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="body">
        <header className="header">
          <div className="header__content">
            <nav className="flex lg:justify-between flex-wrap ">
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
              <div className="flex lg:items-end p-8">
                <div className="text-sm flex-grow">
                  <a href="/"
                     className="text-xl block mt-4 inline-block lg:mt-0 text-gray-700 dark:text-gray-100 hover:text-white mr-4">
                    Accueil
                  </a>
                  <a href="/partenariat"
                     className="text-xl block mt-4 ml-4 inline-block lg:mt-0 text-gray-700 dark:text-gray-100 hover:text-white mr-4">
                    Partenaires
                  </a>
                </div>
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
