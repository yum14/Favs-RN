import { Category, Categories } from '../domain/models';

export const createInitialState = (): Categories.Model => {
  return Categories.factory();
};
export type State = ReturnType<typeof createInitialState>;

export const SET = 'Fav/categories/set' as const;
export const ADD = 'Fav/categories/add' as const;
export const UPDATE = 'Fav/categories/update' as const;
export const REMOVE = 'Fav/categories/remove' as const;

// Action Creator
export const set = (categories: Categories.Model) => {
  return {
    type: SET,
    payload: {
      categories,
    },
  };
};

export const add = (category: Category.Model) => {
  return {
    type: ADD,
    payload: {
      category,
    },
  };
};

export const update = (id: string, category: Category.Values) => {
  return {
    type: UPDATE,
    payload: {
      id,
      category,
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
      return action.payload.categories;
    case ADD:
      return Categories.add(state, action.payload.category);
    case UPDATE: {
      const { payload } = action;
      return Categories.update(state, payload.id, payload.category);
    }
    case REMOVE:
      return Categories.remove(state, action.payload.id);
    default:
      return state;
  }
};

export default reducer;
