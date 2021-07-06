import React from 'react';
import { Alert as NativeAlert } from 'react-native';

interface AlertButton {
  text: string;
  onPress: () => void;
}

interface AlertOptions {
  cancelable: boolean;
}

export const createTwoButtonAlert = (
  title: string,
  message: string,
  negativeButton: AlertButton,
  positiveButton: AlertButton,
  options: AlertOptions,
) => {
  NativeAlert.alert(
    title,
    message,
    [
      {
        ...negativeButton,
        style: 'cancel',
      },
      { ...positiveButton },
    ],
    { cancelable: options.cancelable },
  );
};
