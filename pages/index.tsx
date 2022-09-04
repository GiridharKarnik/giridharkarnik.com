import type { NextPage } from 'next';
import { CommandPrompt, Header } from '@components/pageComponents/home';
import styles from '../styles/Home.module.scss';
import { NotificationActionTypes, useNotification } from '@src/context';
import { NotificationType } from '../types';

const errorMessages = [
  "Nah, that's not it.",
  "It's not you, it's me.",
  'Try again, dude or dudette.',
  'Life is harder than you think.',
  "I'm not in the mood today.",
  'The site is still under construction btw.',
];

const Home: NextPage = () => {
  const [, dispatch] = useNotification();

  const onCommandEnter = (_: string) => {
    dispatch({
      type: NotificationActionTypes.ShowNotification,
      payload: {
        message: errorMessages[Math.floor(Math.random() * errorMessages.length)],
        type: NotificationType.error,
      },
    });
  };

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.titleAndCommandPromptContainer}>
        <div className={styles.titleTextContainer}>
          <h1 className={styles.welcomeMessage}>{"Hi, you've reached the digital home of"}</h1>
          <h1 className={styles.titleText}>{'Giridhar Karnik'}</h1>
        </div>

        <CommandPrompt onCommandEnter={onCommandEnter} />
      </div>
    </div>
  );
};

export default Home;
