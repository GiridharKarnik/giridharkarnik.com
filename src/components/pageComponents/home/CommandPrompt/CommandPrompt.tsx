import React from 'react';
import styles from './CommandPrompt.module.scss';
import { ArrowIcon } from '@components/common/icons';
import variables from '@styles/variables.module.scss';
import { useWindowSize } from '@hooks/index';

export const CommandPrompt: React.FC = () => {
  const [width, height] = useWindowSize();

  const arrowHeight: string = width > 900 ? '20px' : width > 599 ? '14px' : '10px';

  return (
    <div className={styles.commandPromptContainer}>
      <ArrowIcon size={arrowHeight} color={variables.primaryTextColorDarkBackground} />

      <input className={styles.commandPromptInput} placeholder={'type a command and press ⏎'} />
    </div>
  );
};
