import { MIX_CREATE, MIX_REMOVE } from '../actions/mixes';

export default (state = {}, action) => {
  const { payload, mixName } = action;

  switch (action.type) {
    case MIX_CREATE:
      return {
        ...state,
        [`${mixName}`]: { items: payload },
      };

    case MIX_REMOVE:
      const filtered = Object.keys(state).filter(key => key !== mixName);
      return {
        ...filtered.reduce((mixes, key) => {
          mixes[`${key}`] = { ...state[key] };
          return mixes;
        }, {}),
      };

    default:
      return state;
  }
};
