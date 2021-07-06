import React from 'react';

export interface Link {
  uri: string;
}

export type LinkInformation = Link | null;

export function createInitialState(): LinkInformation {
  return null;
}

export const Context = React.createContext({
  linkState: createInitialState(),
  setLinkState: (_: LinkInformation) => {},
});
