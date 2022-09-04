import React from 'react';

import styles from './Notification.module.scss';
import variables from '@styles/variables.module.scss';
import { NotificationType } from '../../../types';
import { ErrorIcon } from '@components/common/icons';
import { useWindowSize } from '@src/hooks';

interface NotificationProps {
  message: string;
  type: NotificationType;
  showNotification: boolean;
}

export const Notification: React.FC<NotificationProps> = ({ message, type, showNotification }) => {
  const [width] = useWindowSize();

  const iconSize: string = width > 900 ? '16px' : width > 599 ? '14px' : '12px';

  const containerStyle = {
    bottom: showNotification ? '30px' : '-60px',
  };

  return (
    <div className={styles.notificationParentWrapper} style={containerStyle}>
      <div className={styles.notificationContainer}>
        <ErrorIcon size={iconSize} color={variables.primaryIconColorDarkBackground} />
        <p className={styles.notificationText}>{message}</p>
      </div>
    </div>
  );
};
