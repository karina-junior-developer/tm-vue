import { createStore } from 'vuex';
import teams from './modules/teams';
import weather from './modules/weather';

export default createStore({
  modules: {
    teams,
    weather,
  },
});
