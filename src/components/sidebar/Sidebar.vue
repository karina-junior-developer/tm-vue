<template>
  <div class="sidebar">
    <ul class="sidebarUl">
      <li class="sidebarLi" :key="item.id" v-for="item in sidebarArray">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
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
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  margin-top: 0px;
}

.sidebarLi {
  list-style: none;
  font-size: 14px;
  padding-bottom: 10px;
  width: 100px;
  text-decoration: underline;
  text-decoration-color: rgb(170, 170, 169);
}

.sidebarLi:hover {
  cursor: pointer;
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
