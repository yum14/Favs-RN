import React from 'react';

export enum Status {
  INITIAL = 'Initial',
  REFRESH = 'Refresh',
  LOADED = 'Loaded',
}

export const createApplicationInitialState = (): Status => {
  return Status.INITIAL;
};

export const Context = React.createContext({
  applicationState: createApplicationInitialState(),
  setApplicationState: (_: Status) => {},
});
