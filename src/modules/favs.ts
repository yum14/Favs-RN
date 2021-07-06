// import { Fav, Favs } from '../domain/models';

// export const createInitialState = (): Favs.Model => {
//   return Favs.factory();
// };
// export type State = ReturnType<typeof createInitialState>;

// export const SET = 'Fav/favs/set' as const;
// export const ADD = 'Fav/favs/add' as const;
// export const UPDATE = 'Fav/favs/update' as const;
// export const REMOVE = 'Fav/favs/remove' as const;

// // Action Creator
// export const set = (favs: Favs.Model) => {
//   return {
//     type: SET,
//     payload: {
//       favs,
//     },
//   };
// };

// export const add = (fav: Fav.Model) => {
//   return {
//     type: ADD,
//     payload: {
//       fav,
//     },
//   };
// };

// export const update = (id: string, fav: Fav.Values) => {
//   return {
//     type: UPDATE,
//     payload: {
//       id,
//       fav,
//     },
//   };
// };

// export const remove = (id: string) => {
//   return {
//     type: REMOVE,
//     payload: {
//       id,
//     },
//   };
// };

// export type Action =
//   | Readonly<ReturnType<typeof set>>
//   | Readonly<ReturnType<typeof add>>
//   | Readonly<ReturnType<typeof update>>
//   | Readonly<ReturnType<typeof remove>>;

// // Reducer
// const reducer = (state = createInitialState(), action: Action) => {
//   switch (action.type) {
//     case SET:
//       return action.payload.favs;
//     case ADD:
//       return Favs.add(state, action.payload.fav);
//     case UPDATE: {
//       const { payload } = action;
//       return Favs.update(state, payload.id, payload.fav);
//     }
//     case REMOVE:
//       return Favs.remove(state, action.payload.id);
//     default:
//       return state;
//   }
// };

// export default reducer;
