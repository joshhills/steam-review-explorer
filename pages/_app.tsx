import './bsn.css'
import './app.scss'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
  
  const router = useRouter()

  console.log('%cHey, are you trying to figure out how something works?\nView the source at https://github.com/joshhills/steam-review-explorer',
    'background: #f8f9fa; color: #007bff; font-size: .75rem; padding: 2px; border-radius:2px')

  if (Object.keys(router.query).length >= 1) {
    const firstQuery = Object.keys(router.query)[0]
    if (firstQuery[0] === '/') {
      const decoded = firstQuery.slice(1).split('&').map((s) => s.replace(/~and~/g,'&')).join('?')
      
      router.push(router.pathname + decoded)
    }
  }

  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  )
}