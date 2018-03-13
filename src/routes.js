import MainSearch from './containers/MainSearch';
import MovieShow from './containers/MovieShow';

export default {
  '/movie/:id': { component: MovieShow },
  '/': { component: MainSearch },
};
