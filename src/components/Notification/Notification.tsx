import React from 'react';

import styles from './Notification.module.scss';
import variables from '@styles/variables.module.scss';
import { NotificationType } from '../../../types';
import { ErrorIcon } from '@components/common/icons';

interface NotificationProps {
  message: string;
  type: NotificationType;
  showNotification: boolean;
}

export const Notification: React.FC<NotificationProps> = ({ message, type, showNotification }) => {
  const iconSize = '16px';

  const containerStyle = {
    bottom: showNotification ? '30px' : '-60px',
  };

  return (
    <div className={styles.notificationContainer} style={containerStyle}>
      <ErrorIcon size={iconSize} color={variables.primaryIconColorDarkBackground} />
      <p className={styles.notificationText}>{message}</p>
    </div>
  );
};
