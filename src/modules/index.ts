import { combineReducers } from 'redux';
import * as PageInfos from './pageInfos';
import * as Categories from './categories';

export const createInitialState = () => {
  return {
    // favs: Favs.createInitialState(),
    pageInfos: PageInfos.createInitialState(),
    categories: Categories.createInitialState(),
  };
};

export type AppState = Readonly<ReturnType<typeof createInitialState>>;

export default combineReducers<AppState>({
  // favs: Favs.default,
  pageInfos: PageInfos.default,
  categories: Categories.default,
});
