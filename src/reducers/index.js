import SearchReducer, { initialState as searchState } from './search';

export const initialState = {
  movie: {},
  search: searchState,
}

export default {
  movie: state => state || {},
  search: SearchReducer,
};
