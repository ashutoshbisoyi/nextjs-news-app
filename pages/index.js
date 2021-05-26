import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  return (
    <div>
      <Head>
        <title>The News Wave</title>
        <meta
          name='description'
          content='The News Wave - Your one stop news destination. Get latest news updates within 1hour from 8 top catagories like entertainment, sports, business and more.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div>
          <h1>The News Wave</h1>
          <p>Your one stop news destination</p>
          <Link href='/feed/general/1'>
            <button>Start Reading</button>
          </Link>
          <div className={styles.illustration}>
            <Image src='/img2.png' width={500} height={500} alt='img' />
          </div>
        </div>
      </main>
    </div>
  );
}
