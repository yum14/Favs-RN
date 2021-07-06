import * as PageInfo from './pageInfo';
import { filter } from '@januswel/object-utilities';

export interface Model {
  [id: string]: PageInfo.Model;
}

export const factory = (values?: PageInfo.Model[]): Model => {
  if (!values) {
    return {};
  }

  return values.reduce<Model>((result, newValue) => {
    const newPageInfo = PageInfo.factory(newValue);
    result[newPageInfo.id] = newPageInfo;
    return result;
  }, {});
};

export const add = (values: Model, newValue: PageInfo.Model): Model => {
  return {
    ...values,
    [newValue.id]: newValue,
  };
};

export const remove = (values: Model, targetId: string): Model => {
  return filter(values, id => id !== targetId);
};

export const update = (values: Model, id: string, newValue: PageInfo.Values) => {
  return {
    ...values,
    [id]: PageInfo.update(values[id], newValue),
  };
};
