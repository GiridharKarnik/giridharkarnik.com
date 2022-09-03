import React from 'react';
import styles from './CommandPrompt.module.scss';
import { ArrowIcon } from '@components/common/icons';
import variables from '@styles/variables.module.scss';

export const CommandPrompt: React.FC = () => {
  return (
    <div className={styles.commandPromptContainer}>
      <ArrowIcon size="20px" color={variables.primaryTextColorDarkBackground} />

      <input className={styles.commandPromptInput} placeholder={'type a command and press ⏎'} />
    </div>
  );
};
