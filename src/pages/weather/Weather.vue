<template>
  <div class="weatherBlock">
    <div v-if="isLoading"><Loading /></div>

    <div>
      <div class="caption">Weather</div>
      <div>{{ city }}, {{ formatDate(today) }}.</div>
      <div>Conditions: {{ conditions }}.</div>
      <div>Temperature: {{ temperature }} °C.</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex/dist/vuex.cjs.js';
import { weatherURL } from '../../constants/weatherURL';
import { Loading } from '../../components';
export default {
  name: 'Weather',

  data() {
    return {
      today: new Date(),
    };
  },

  computed: {
    ...mapGetters('weather', [
      'isLoading',
      'city',
      'conditions',
      'temperature',
    ]),
  },

  components: {
    Loading,
  },

  methods: {
    formatDate(value) {
      const date = new Date(value);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    },
  },

  mounted() {
    this.$store.dispatch('weather/fetchWeather', weatherURL);
  },
};
</script>

<style lang="scss" scoped>
.weatherBlock {
  margin-left: 400px;
  margin-top: 100px;
  font-size: 15px;
}

.caption {
  font-size: 16px;
  font-weight: bold;
}

div {
  margin-bottom: 10px;
}
</style>
