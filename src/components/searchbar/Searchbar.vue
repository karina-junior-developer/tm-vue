<template>
  <div class="searchbar">
    <input
      class="searchInput"
      type="text"
      name="team"
      placeholder="Find a team..."
      :value="searchedValue"
      @input="onInput"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Searchbar',

  computed: {
    ...mapGetters('teams', ['searchedValue']),
  },

  methods: {
    onInput(event) {
      this.$store.commit('teams/SET_SEARCHED_VALUE', event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.searchInput {
  padding: 0.5rem;
  border: none;
  border-radius: 10px;
  outline: none;
  width: 350px;
  padding-left: 15px;
}

@media (max-width: 768px) {
  .searchInput {
    width: 90%;
  }
}
</style>
