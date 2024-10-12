import Head from 'next/head'
import PasswordChecker from './components/PasswordChecker/page'
import SocialSection from './components/socialSection/page'
export default function Home() {
  return (
    <div className="cards-page">
      <Head>
        <title>Verificación de contraseñas</title>
        <meta name="description" content="Verificación de contraseñas" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha384-k6RqeWeci5ZR/Lv4MR0sA0FfDOMPHgY5MlE9w00zpD/JnY4v7H/SW69UR4s2a7u"
          crossOrigin="anonymous"
        />
      </Head>

      <main className="container">
        <div className="containerTitle text-center my-5">
          <h1 className="main-title">Verificación de contraseñas</h1>
          <p className="subtitle text-lg text-gray-600">
            Explora nuestra Verificación de contraseñas
          </p>
        </div>
        <PasswordChecker />
        <SocialSection />
      </main>
    </div>
  )
}