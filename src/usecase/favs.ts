import { Dispatch } from 'redux';
import Storage from 'react-native-storage';
import { Fav, PageInfo, PageInfos } from '../domain/models';
import { Favs as FavsRepository } from '../domain/repositories';
// import { add, remove } from '../modules/favs';
import { add, remove, set, update } from '../modules/pageInfos';
import { getMetaAsync } from '../lib/httpClient';

export const getAsync = (storage: Storage) => {
  return async () => {
    const favs = await FavsRepository.getAll(storage);
    const pageInfos = await Promise.all(
      Object.keys(favs).map(async key => {
        const meta = await getMetaAsync(favs[key].uri);

        return PageInfo.factory({
          id: favs[key].id,
          uri: favs[key].uri,
          order: favs[key].order,
          comment: favs[key].comment,
          category: favs[key].category,
          title: meta.ogTitle || meta.title || '',
          desc: meta.ogDescription || meta.description,
          imageSource: meta.ogImage || meta.Thumbnail,
        });
      }),
    );

    return PageInfos.factory(pageInfos);

    // dispatch(set(PageInfos.factory(pageInfos)));
  };
};

export const addAndSync = (values: Fav.Values, storage: Storage) => {
  return async (dispatch: Dispatch) => {
    const newFav = Fav.factory(values);
    // dispatch(add(newFav));
    const repoPromise = FavsRepository.add(newFav, storage);
    const getMetaPromise = (async () => {
      const meta = await getMetaAsync(values.uri);
      return PageInfo.factory({
        id: newFav.id,
        uri: newFav.uri,
        order: newFav.order,
        comment: newFav.comment,
        category: newFav.category,
        title: meta.ogTitle || meta.title || '',
        desc: meta.ogDescription || meta.description,
        imageSource: meta.ogImage || meta.Thumbnail,
      });
    })();

    await repoPromise;
    const newPageInfo = await getMetaPromise;

    dispatch(add(newPageInfo));
  };
};

export const removeAndSync = (id: string, storage: Storage) => {
  return async (dispatch: Dispatch) => {
    await FavsRepository.remove(id, storage);
    dispatch(remove(id));
  };
};

export const editAndSync = (id: string, values: PageInfo.Model, newValues: PageInfo.Values, storage: Storage) => {
  return async function (dispatch: Dispatch) {
    dispatch(update(id, newValues));
    const newModel = PageInfo.update(values, newValues);
    FavsRepository.update(id, newModel, storage);
  };
};

export interface Values {
  readonly id: string;
  readonly uri: string;
  readonly order: number;
  readonly comment?: string;
  readonly category?: string;
  readonly title: string;
  readonly desc?: string;
  readonly imageSource?: string;
}
