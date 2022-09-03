import React from 'react';
import { GithubIcon, LinkedinIcon } from '@components/common/icons';

import variables from '@styles/variables.module.scss';

import styles from './Header.module.scss';
import { useWindowSize } from '@hooks/useWindowSize';

export const Header: React.FC = () => {
  const [width] = useWindowSize();

  const iconSize: string = width > 900 ? '34px' : width > 599 ? '28px' : '24px';

  return (
    <div className={styles.headerContainer}>
      <div
        className={styles.iconContainer}
        onClick={() => {
          window.open('https://github.com/GiridharKarnik');
        }}
      >
        <GithubIcon size={iconSize} color={variables.primaryIconColorDark} />
      </div>

      <div
        className={styles.iconContainer}
        onClick={() => {
          window.open('https://linkedin.com/in/GiridharKarnik');
        }}
      >
        <LinkedinIcon size={iconSize} color={variables.primaryIconColorDark} />
      </div>
    </div>
  );
};
