const state = {
  isLoading: false,
  temperature: '',
  conditions: '',
  city: '',
};

const mutations = {
  SET_LOADING(state, value) {
    state.isLoading = value;
  },

  SET_TEMPERATURE(state, value) {
    state.temperature = value;
  },

  SET_WEATHER_CONDITIONS(state, value) {
    state.conditions = value;
  },

  SET_CITY(state, value) {
    state.city = value;
  },
};

const actions = {
  async fetchWeather({ commit }, weatherURL) {
    commit('SET_LOADING', true);
    try {
      const loadedweather = await fetch(weatherURL);
      const finalWeather = await loadedweather.json();

      const temperatureFromServer = Math.round(finalWeather.main.temp);
      const conditionsFromServer = finalWeather.weather[0].description;
      const cityFromServer = finalWeather.name;
      commit('SET_CITY', cityFromServer);
      commit('SET_TEMPERATURE', temperatureFromServer);
      commit('SET_WEATHER_CONDITIONS', conditionsFromServer);
    } catch (error) {
      console.log('Failed to fetch weather:', error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
};

const getters = {
  isLoading: (state) => state.isLoading,
  temperature: (state) => state.temperature,
  conditions: (state) => state.conditions,
  city: (state) => state.city,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
