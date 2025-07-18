<template>
  <div class="sidebar">
    <ul class="sidebarUl">
      <li class="sidebarLi" :key="item.id" v-for="item in sidebarArray">
        <router-link :to="goTo(item)">
          <button class="sidebarButton">
            {{ item.title }}
          </button></router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
  name: 'Sidebar',
  data() {
    return {
      sidebarArray: [
        { id: '001', title: 'Home' },
        { id: '002', title: 'My profile' },
        { id: '003', title: 'Notifications' },
        { id: '004', title: 'Calendar' },
        { id: '005', title: 'Settings' },
      ],
      routeMap: {
        Home: '/',
        'My profile': '/my-profile',
        Notifications: '/notifications',
        Calendar: '/calendar',
        Settings: '/settings',
      },
    };
  },

  methods: {
    goTo(item) {
      return this.routeMap[item.title] || '/';
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  margin-top: 0px;
}

.sidebarLi {
  list-style: none;
  padding-bottom: 10px;
  text-decoration: underline;
  text-decoration-color: rgb(170, 170, 169);
}

.sidebarButton {
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
  padding-bottom: 10px;
  width: 100px;
  text-decoration: underline;
  text-decoration-color: rgb(170, 170, 169);
  border: none;
  background-color: transparent;
  text-align: left;
  cursor: pointer;
}

.sidebarButton:hover {
  background-color: rgb(226, 226, 222);
}

.sidebarUl {
  margin: 0;
  padding-left: 20px;
}

@media (max-width: 768px) {
  .sidebarLi {
    display: inline-block;
    margin-right: 10px;
    font-size: 13px;
  }

  .sidebarUl {
    padding-left: 10px;
  }
}
</style>
