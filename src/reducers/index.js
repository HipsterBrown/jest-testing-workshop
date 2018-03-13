import SearchReducer, {initialState as searchState} from './search';
import MovieReducer, {initialState as movieState} from './movie';

export const initialState = {
  movie: movieState,
  search: searchState,
};

export default {
  movie: MovieReducer,
  search: SearchReducer,
};
