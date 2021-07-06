import * as Fav from './fav';
import { filter } from '@januswel/object-utilities';

export interface Model {
  [id: string]: Fav.Model;
}

export const factory = (values?: Fav.Model[]): Model => {
  if (!values) {
    return {};
  }

  return values.reduce<Model>((result, newValue) => {
    // const newFav = Fav.factory(newValue);
    // result[newFav.id] = newFav;
    result[newValue.id] = newValue;
    return result;
  }, {});
};

export const add = (values: Model, newValue: Fav.Model): Model => {
  return {
    ...values,
    [newValue.id]: newValue,
  };
};

export const remove = (values: Model, targetId: string) => {
  return filter(values, id => id !== targetId);
};

export const update = (values: Model, id: string, newValue: Fav.Values) => {
  return {
    ...values,
    [id]: Fav.update(values[id], newValue),
  };
};
