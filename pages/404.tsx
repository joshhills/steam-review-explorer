import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Container } from "react-bootstrap";

export default function Custom404() {
    return (<>
        <Head>
            <script type="text/javascript" dangerouslySetInnerHTML={{__html: `
                var pathSegmentsToKeep = 1;

                var l = window.location;

                if (l.pathname.startsWith('/steam-review-facts/game/')) {
                    l.replace(
                      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
                      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
                      l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
                      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
                      l.hash
                    );
                }
            `}}></script>
        </Head>
        <Container>
            <h1>404</h1>
            <h3>Page Not Found</h3>
            <p>Did you expect to see a page here? <Link href="/feedback">Leave some feedback</Link></p>
        </Container>
    </>)
}