import Head from "next/head";
import React from "react";

export default function Custom404() {
    return (<>
        <Head>
            <script type="text/javascript" dangerouslySetInnerHTML={{__html: `
                var pathSegmentsToKeep = 1;

                var l = window.location;
                l.replace(
                  l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
                  l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
                  l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
                  (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
                  l.hash
                );
            `}}></script>
        </Head>
        <h1>404 - Page Not Found</h1>
    </>)
}