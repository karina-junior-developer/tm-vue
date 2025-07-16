<template>
  <div>
    <div class="appHeaderAndSearch" v-if="!teamId">
      <div class="headerBlock"><Header></Header></div>
      <div class="searchbarBlock"><Searchbar></Searchbar></div>
    </div>

    <div class="appContent">
      <div class="sidebarBlock"><SideBar /></div>
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
  Header,
  Loading,
  NoData,
  Searchbar,
  SideBar,
  TeamList,
  TeamView,
} from './components';

import { mapGetters } from 'vuex';
import { teamsURL } from './constants/dbURL';

export default {
  name: 'App',

  components: {
    Header,
    Loading,
    NoData,
    Searchbar,
    SideBar,
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

<style lang="scss" scoped>
.headerBlock {
  margin-top: 0px;
  text-align: center;
}

.searchbarBlock {
  text-align: center;
  margin-top: 40px;
}

.appHeaderAndSearch {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0;
}

.appContent {
  display: flex;
  flex: 1;
}

.sidebarBlock {
  width: 20%;
  margin-top: 60px;
}

.mainBlock {
  width: 80%;
  flex: 1;
  margin-left: 70px;
}
</style>
