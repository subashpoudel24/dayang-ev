import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Sora, Inter } from 'next/font/google';
import '../styles/globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${sora.variable} ${inter.variable} font-sans`}>
      <Head>
        <title>Dayang EV — Smart Graphene Electric Scooters in Nepal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="Official Dayang electric scooters in Nepal. 72V 32Ah Graphene battery, 3000W peak BLDC motor, 90 km range, TCS cruise control and reverse gear. Showroom in Jawalakhel, Lalitpur."
        />
        <meta property="og:title" content="Dayang EV — Smart Graphene Electric Scooters in Nepal" />
        <meta
          property="og:description"
          content="90 km range, 65 km/h top speed, 3000W peak motor. Book a test ride at our Jawalakhel showroom."
        />
        <meta property="og:image" content="/images/dayang_v15.png" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
