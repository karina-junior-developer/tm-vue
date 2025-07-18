<template>
  <div>
    <div class="appHeaderAndSearch" v-if="!teamId">
      <div class="searchbarBlock"><Searchbar></Searchbar></div>
    </div>

    <div class="appContent">
      <div class="mainBlock">
        <div v-if="isLoading"><Loading /></div>
        <div v-else-if="teamId"><TeamView /></div>
        <div v-else-if="teams.length === 0"><NoData /></div>
        <div v-else><TeamList /></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Searchbar,
  Loading,
  TeamView,
  NoData,
  TeamList,
} from '../../components';

import { mapGetters } from 'vuex';
import { teamsURL } from '../../constants/dbURL';

export default {
  name: 'Home',

  components: {
    Loading,
    NoData,
    Searchbar,
    TeamList,
    TeamView,
  },
  computed: {
    ...mapGetters('teams', ['teams', 'isLoading', 'teamId']),
  },

  mounted() {
    this.$store.dispatch('teams/fetchTeams', teamsURL);
  },
};
</script>

<style>
.searchbarBlock {
  margin-top: 40px;
  text-align: center;
}

.mainBlock {
  margin-left: 400px;
}
</style>
