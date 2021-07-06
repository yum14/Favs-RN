import { Dispatch } from 'redux';
import Storage from 'react-native-storage';
import { Category } from '../domain/models';
import { Categories as CategoriesRepo } from '../domain/repositories';
// import { add, remove } from '../modules/favs';
import { add, remove, update } from '../modules/categories';

export const getAsync = (storage: Storage) => {
  return async () => {
    return await CategoriesRepo.getAll(storage);
    // dispatch(set(values));
  };
};

export const addAndSync = (values: Category.Values, storage: Storage) => {
  return async (dispatch: Dispatch) => {
    const newCategory = Category.factory(values);
    dispatch(add(newCategory));
    CategoriesRepo.add(newCategory, storage);
  };
};

export const removeAndSync = (id: string, storage: Storage) => {
  return async (dispatch: Dispatch) => {
    dispatch(remove(id));
    CategoriesRepo.remove(id, storage);
  };
};

export const editAndSync = (id: string, values: Category.Model, newValues: Category.Values, storage: Storage) => {
  return async function (dispatch: Dispatch) {
    dispatch(update(id, newValues));
    const newModel = Category.update(values, newValues);
    CategoriesRepo.update(id, newModel, storage);
  };
};
