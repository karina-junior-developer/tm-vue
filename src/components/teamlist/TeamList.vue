<template>
  <div class="teamList">
    <h2 class="caption">Teams</h2>
    <ul>
      <li class="teamListLi" v-for="team in foundValue" :key="team.id">
        <div class="main">
          <div class="title">
            <div class="teamName">{{ team.name }}.</div>
            <div class="createdAndMembers">
              Created: {{ formatDate(team.createdAt) }}. Members amount:
              {{ team.members.length }}
            </div>
          </div>
          <div class="button">
            <button class="detailsButton" @click="onClickView(team.id)">
              Details
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TeamList',

  computed: {
    ...mapGetters('teams', ['foundValue']),
  },

  methods: {
    onClickView(id) {
      this.$store.commit('teams/SET_TEAM_ID', id);
    },

    formatDate(value) {
      const date = new Date(value);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.teamList {
  margin-top: 25px;
  width: 300px;
}

.teamListLi {
  list-style: none;
  padding-bottom: 5px;
  margin-bottom: 10px;
  width: 450px;
  font-size: 14px;
  border: 1px solid rgb(170, 170, 169);
  padding: 10px;
  border-radius: 5px;
}

.main {
  display: flex;
  flex-direction: row;
}

.caption {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.teamName {
  margin-bottom: 10px;
}

.title {
  padding-top: 4px;
  width: 80%;
}

.buttons {
  width: 20%;
}

.detailsButton {
  margin-top: 11px;
  border: none;
  outline: none;
  border-radius: 10px;
  height: 25px;
  width: 65px;
  padding: 5px 10px;
  font-size: 13px;
  background: transparent;
  cursor: pointer;
}

.detailsButton:hover {
  background: rgb(226, 226, 222);
}

@media (max-width: 768px) {
  .teamList {
    width: 90%;
  }

  .teamListLi {
    width: 100%;
    font-size: 13px;
  }

  .main {
    flex-direction: column;
    align-items: flex-start;
  }

  .detailsButton {
    margin-top: 10px;
  }
}
</style>
