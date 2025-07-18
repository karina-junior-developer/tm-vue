<template>
  <div>
    <div class="appHeaderAndSearch" v-if="!teamId">
      <div class="headerBlock"><Header></Header></div>
    </div>

    <div class="appContent">
      <div class="sidebarBlock"><SideBar /></div>
      <div class="mainBlock">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Header, SideBar } from './components';

export default {
  name: 'MainLayout',

  components: {
    Header,

    SideBar,
  },
  computed: {
    ...mapGetters('teams', ['teamId']),
  },
};
</script>

<style lang="scss" scoped>
.headerBlock {
  margin-top: 20px;
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
}

.appContent {
  display: flex;
  flex: 1;
  margin-top: 60px;
}

.sidebarBlock {
  position: fixed;
  width: 20%;
  margin-top: 200px;
}

.mainBlock {
  width: 80%;
  flex: 1;
  margin-left: 70px;
}
</style>
