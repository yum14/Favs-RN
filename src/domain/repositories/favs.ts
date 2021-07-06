import { Fav, Favs } from '../models';
import Storage from 'react-native-storage';

const KEY = 'favs';

export const getAll = async (storage: Storage): Promise<Favs.Model> => {
  return await storage
    .getAllDataForKey(KEY)
    .then(favs => {
      return Favs.factory(favs);
    })
    .catch(err => {
      console.log(err);
      return Favs.factory();
    });
};

export const add = (fav: Fav.Model, storage: Storage): Promise<void> => {
  return storage.save({
    key: KEY,
    id: fav.id,
    data: fav,
  });
};

export const remove = (id: string, storage: Storage): Promise<void> => {
  return storage.remove({
    key: KEY,
    id: id,
  });
};

export const update = (id: string, value: Fav.Values, storage: Storage) => {
  return;
};
