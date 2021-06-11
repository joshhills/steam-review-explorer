import Document, {Head, Html, Main, NextScript} from 'next/document'
import React from "react"

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
        <Html>
            <Head>
                <meta name="title" content="Steam Review Explorer"/>
                <meta name="description" content="Visualise and download Steam reviews using this free tool"></meta>
                <link rel="apple-touch-icon" sizes="180x180" href="/steam-review-explorer/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/steam-review-explorer/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/steam-review-explorer/favicon-16x16.png"/>
                <link rel="manifest" href="/steam-review-explorer/site.webmanifest"/>
                <link rel="mask-icon" href="/steam-review-explorer/safari-pinned-tab.svg" color="#5bbad5"/>
                <link rel="shortcut icon" href="/steam-review-explorer/favicon.ico"/>
                <meta name="msapplication-TileColor" content="#00aba9"/>
                <meta name="msapplication-config" content="https://project.joshhills.dev/steam-review-explorer/browserconfig.xml"/>
                <meta name="theme-color" content="#f8f9fa"></meta>
                
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://project.joshhills.dev/steam-review-explorer/"/>
                <meta property="og:title" content="Steam Review Explorer"/>
                <meta property="og:description" content="Visualise and download Steam reviews using this free tool"/>
                <meta property="og:image" content="https://project.joshhills.dev/steam-review-explorer/social-share-img.jpg"/>

                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content="https://project.joshhills.dev/steam-review-explorer/"/>
                <meta property="twitter:title" content="Steam Review Explorer"/>
                <meta property="twitter:description" content="Visualise and download Steam reviews using this free tool"/>
                <meta property="twitter:image" content="https://project.joshhills.dev/steam-review-explorer/social-share-img.jpg"></meta>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
        )
    }
}
  
  export default MyDocument