import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Fetch from '../components/Fetch';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>React Testing Library Example</title>
      </Head>

      <main className={styles.main}>
        <Fetch url="/api/greeting" />
      </main>

      <footer className={styles.footer}>Powered by 🐐🐐🐐</footer>
    </div>
  );
}
