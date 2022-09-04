import React, { createContext, Dispatch, useContext, useEffect, useReducer } from 'react';
import { NotificationType } from '../../types';
import { Notification } from '@src/components';

export interface NotificationState {
  message: string;
  type: NotificationType;
  toastDurationInMs?: number;
  showNotification: boolean;
}

export enum NotificationActionTypes {
  ShowNotification,
  HideNotification,
}

export interface ShowNotification {
  type: NotificationActionTypes.ShowNotification;
  payload: {
    message: string;
    type: NotificationType;
    toastDurationInMs?: number;
  };
}

export interface HideNotification {
  type: NotificationActionTypes.HideNotification;
}

export type ToastContextActions = ShowNotification | HideNotification;

export const defaultNotificationState: NotificationState = {
  message: '',
  type: NotificationType.error,
  showNotification: false,
};

const NotificationContext = createContext<[NotificationState, Dispatch<ToastContextActions>]>([
  defaultNotificationState,
  (): void => {},
]);

function notificationReducer(state: NotificationState, action: ToastContextActions): NotificationState {
  switch (action.type) {
    case NotificationActionTypes.ShowNotification: {
      return {
        message: action.payload.message,
        type: action.payload.type,
        toastDurationInMs: action.payload.toastDurationInMs,
        showNotification: true,
      };
    }
    case NotificationActionTypes.HideNotification: {
      return {
        ...state,
        showNotification: false,
      };
    }
    default:
      return state;
  }
}

export const NotificationContextProvider: React.FC<{
  externalToastState?: NotificationState;
  children?: React.ReactNode;
}> = ({ children, externalToastState }) => {
  const [state, dispatch] = useReducer(
    notificationReducer,
    Object.assign(defaultNotificationState, externalToastState)
  );

  useEffect(() => {
    if (state.showNotification) {
      setTimeout(() => {
        dispatch({
          type: NotificationActionTypes.HideNotification,
        });
      }, 3500);
    }
  }, [state.showNotification]);

  return (
    <NotificationContext.Provider value={[state, dispatch]}>
      <div id="notification_context_parent">{children}</div>

      <Notification {...state} />
    </NotificationContext.Provider>
  );
};

export const useNotification = (): [NotificationState, Dispatch<ToastContextActions>] =>
  useContext(NotificationContext);
