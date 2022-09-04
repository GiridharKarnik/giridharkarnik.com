import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { NotificationType } from '../../types';

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
  type: NotificationType.info,
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
  const reducerContext = useReducer(notificationReducer, Object.assign(defaultNotificationState, externalToastState));

  return <NotificationContext.Provider value={reducerContext}>{children}</NotificationContext.Provider>;
};

export const useToastState = (): [NotificationState, Dispatch<ToastContextActions>] => useContext(NotificationContext);
