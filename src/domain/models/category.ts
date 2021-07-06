import 'react-native-get-random-values';
import { v4 as generatedUuid } from 'uuid';

export interface Model {
  readonly id: string;
  readonly name: string;
  readonly order: number;
  readonly backgroundColor: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface Values {
  readonly name: string;
  readonly order?: number;
  readonly backgroundColor: string;
}

export const factory = (category: Values): Model => {
  const now = new Date().toISOString();

  const result = {
    id: generatedUuid(),
    name: category.name,
    order: category.order ? category.order : 0,
    backgroundColor: category.backgroundColor,
    createdAt: now,
    updatedAt: now,
  };

  return result;
};

export const update = (category: Model, newValue: Values): Model => {
  const now = new Date().toISOString();

  return {
    ...category,
    ...newValue,
    updatedAt: now,
  };
};
