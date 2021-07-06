import 'react-native-get-random-values';
import { v4 as generatedUuid } from 'uuid';

export interface Model {
  readonly id: string;
  readonly uri: string;
  readonly order: number;
  readonly comment?: string;
  readonly category?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface Values {
  readonly uri: string;
  readonly order?: number;
  readonly comment?: string;
  readonly category?: string;
}

export const factory = (fav: Values): Model => {
  const now = new Date().toISOString();

  return {
    id: generatedUuid(),
    uri: fav.uri,
    order: fav.order ? fav.order : 0,
    comment: fav.comment,
    category: fav.category,
    createdAt: now,
    updatedAt: now,
  };
};

export const update = (fav: Model, newValue: Values): Model => {
  const now = new Date().toISOString();

  return {
    ...fav,
    ...newValue,
    updatedAt: now,
  };
};
