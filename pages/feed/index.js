import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Feed.module.css';

const FeedHome = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/feed/general/1');
  }, []);
  return (
    <div className='container'>
      <header className={styles.header}>
        <h1>News Wave</h1>
        <ul>
          <li>Feed</li>
          <li>Contact</li>
        </ul>
      </header>
    </div>
  );
};

export default FeedHome;
