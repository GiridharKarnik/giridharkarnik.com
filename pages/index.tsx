import type { NextPage } from 'next';
import { CommandPrompt, Header } from '@components/pageComponents/home';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.titleAndCommandPromptContainer}>
        <div className={styles.titleTextContainer}>
          <h1 className={styles.welcomeMessage}>{"Hi, you've reached the digital home of"}</h1>
          <h1 className={styles.titleText}>{'Giridhar Karnik'}</h1>
        </div>

        <CommandPrompt />
      </div>
    </div>
  );
};

export default Home;
