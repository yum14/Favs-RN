import React from 'react';
import { createStorage } from '../domain/repositories';

export const createApplicationInitialState = () => {
  return createStorage();
};

export const Context = React.createContext({
  applicationState: createApplicationInitialState(),
});
