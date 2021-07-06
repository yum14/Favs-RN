import { PageInfo, PageInfos } from '../domain/models';

export const createInitialState = (): PageInfos.Model => {
  return PageInfos.factory();
};
export type State = ReturnType<typeof createInitialState>;

export const SET = 'Fav/pageInfo/set' as const;
export const ADD = 'Fav/pageInfo/add' as const;
export const UPDATE = 'Fav/pageInfo/update' as const;
export const REMOVE = 'Fav/pageInfo/remove' as const;

// Action Creator
export const set = (pageInfos: PageInfos.Model) => {
  return {
    type: SET,
    payload: {
      pageInfos,
    },
  };
};

export const add = (pageInfo: PageInfo.Model) => {
  return {
    type: ADD,
    payload: {
      pageInfo,
    },
  };
};

export const update = (id: string, pageInfo: PageInfo.Values) => {
  return {
    type: UPDATE,
    payload: {
      id,
      pageInfo,
    },
  };
};

export const remove = (id: string) => {
  return {
    type: REMOVE,
    payload: {
      id,
    },
  };
};

export type Action =
  | Readonly<ReturnType<typeof set>>
  | Readonly<ReturnType<typeof add>>
  | Readonly<ReturnType<typeof update>>
  | Readonly<ReturnType<typeof remove>>;

// Reducer
const reducer = (state = createInitialState(), action: Action) => {
  switch (action.type) {
    case SET:
      return action.payload.pageInfos;
    case ADD:
      return PageInfos.add(state, action.payload.pageInfo);
    case UPDATE: {
      const { payload } = action;
      return PageInfos.update(state, payload.id, payload.pageInfo);
    }
    case REMOVE:
      return PageInfos.remove(state, action.payload.id);
    default:
      return state;
  }
};

export default reducer;
