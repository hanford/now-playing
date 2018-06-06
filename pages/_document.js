import Document, { Head, Main, NextScript } from 'next/document'

import { extractCritical } from 'emotion-server'
import { fontFace } from 'emotion'

export default class DocumentComponent extends Document {
  static getInitialProps ({ renderPage }) {
    const page = renderPage()
    const stylesTAG = extractCritical(page.html)

    return {
      ...renderPage(),
      ...stylesTAG
    }
  }

  render () {
    return (
      <html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <title>Trends</title>
          <meta name='name' content='trends' />
          <meta name='description' content='trends trending' />
          <meta name='mobile-web-app-capable' content='yes' />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
