import React from 'react';
import { GithubIcon, LinkedinIcon } from '@components/common/icons';

import variables from '@styles/variables.module.scss';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <div className={styles.headerContainer}>
      <div
        className={styles.iconContainer}
        onClick={() => {
          window.open('https://github.com/GiridharKarnik');
        }}
      >
        <GithubIcon size="30px" color={variables.primaryIconColorDark} />
      </div>

      <div
        className={styles.iconContainer}
        onClick={() => {
          window.open('https://linkedin.com/in/GiridharKarnik');
        }}
      >
        <LinkedinIcon size="30px" color={variables.primaryIconColorDark} />
      </div>
    </div>
  );
};
