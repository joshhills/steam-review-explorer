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
                <title>Steam Review Explorer</title>
                <meta name="title" content="Steam Review Explorer"/>
                <meta name="description" content="Better understand player feedback using this free data analysis tool"></meta>
                <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/steam-review-facts/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/steam-review-facts/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/steam-review-facts/favicon-16x16.png"/>
                <link rel="manifest" href="/steam-review-facts/site.webmanifest"/>
                <link rel="mask-icon" href="/steam-review-facts/safari-pinned-tab.svg" color="#5bbad5"/>
                <link rel="shortcut icon" href="/steam-review-facts/favicon.ico"/>
                <meta name="msapplication-TileColor" content="#00aba9"/>
                <meta name="msapplication-config" content="https://project.joshhills.dev/steam-review-facts/browserconfig.xml"/>
                <meta name="theme-color" content="#f8f9fa"></meta>
                
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://project.joshhills.dev/steam-review-facts/"/>
                <meta property="og:title" content="Steam Review Explorer"/>
                <meta property="og:description" content="Better understand player feedback using this free data analysis tool"/>
                <meta property="og:image" content="https://project.joshhills.dev/steam-review-facts/social-share-img.jpg"/>

                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content="https://project.joshhills.dev/steam-review-facts/"/>
                <meta property="twitter:title" content="Steam Review Explorer"/>
                <meta property="twitter:description" content="Better understand player feedback using this free data analysis tool"/>
                <meta property="twitter:image" content="/steam-review-facts/social-share-img.jpg"></meta>
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