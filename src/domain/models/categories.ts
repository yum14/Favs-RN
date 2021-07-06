import * as Category from './category';
import { filter } from '@januswel/object-utilities';

export interface Model {
  [id: string]: Category.Model;
}

export const factory = (values?: Category.Model[]): Model => {
  if (!values) {
    return {};
  }

  return values.reduce<Model>((result, newValue) => {
    // const newCategory = Category.factory(newValue);
    // result[newCategory.id] = newCategory;
    result[newValue.id] = newValue;
    return result;
  }, {});
};

export const add = (values: Model, newValue: Category.Model): Model => {
  return {
    ...values,
    [newValue.id]: newValue,
  };
};

export const remove = (values: Model, targetId: string) => {
  return filter(values, id => id !== targetId);
};

export const update = (values: Model, id: string, newValue: Category.Values) => {
  return {
    ...values,
    [id]: Category.update(values[id], newValue),
  };
};
