import React from 'react';

import styles from './Notification.module.scss';
import { NotificationType } from '../../../types';

interface NotificationProps {
  message: string;
  type: NotificationType;
}

export const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return (
    <div className={styles.notificationContainer}>
      <div className={styles.notification}>Notification</div>
    </div>
  );
};
