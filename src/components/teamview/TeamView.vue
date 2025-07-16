<template>
  <div class="teamBlock">
    <div class="teamAndButton">
      <div v-if="isEditingTeamName">
        <TeamConfig
          v-model="teamName"
          @save="handleSaveTeamName"
          @cancel="isEditingTeamName = false"
        />
      </div>
      <div class="teamAndButton" v-else>
        <h2 class="selectedTeamCaption">{{ selectedTeam.name }}</h2>
        <button class="editButton" @click="startEditingTeamName">Edit</button>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in selectedTeam.members" :key="member.id">
          <!-- Name -->
          <td>
            <div v-if="editing(member, 'name')">
              <TeamConfig
                :modelValue="editValue"
                @update:modelValue="editValue = $event"
                @save="handleSaveMember"
                @cancel="cancelEditing"
              />
            </div>
            <div v-else>
              {{ member.name }}
              <button
                class="editButton"
                @click="startEditing(member.id, 'name', member.name)"
              >
                Edit
              </button>
            </div>
          </td>

          <!-- Role -->
          <td>
            <div v-if="editing(member, 'role')">
              <TeamConfig
                :modelValue="editValue"
                @update:modelValue="editValue = $event"
                @save="handleSaveMember"
                @cancel="cancelEditing"
              />
            </div>

            <div v-else>
              {{ member.role }}
              <button
                class="editButton"
                @click="startEditing(member.id, 'role', member.role)"
              >
                Edit
              </button>
            </div>
          </td>

          <!-- Email -->
          <td>
            <div v-if="editing(member, 'email')">
              <TeamConfig
                :modelValue="editValue"
                @update:modelValue="editValue = $event"
                @save="handleSaveMember"
                @cancel="cancelEditing"
              />
            </div>

            <div v-else>
              {{ member.email }}
              <button
                class="editButton"
                @click="startEditing(member.id, 'email', member.email)"
              >
                Edit
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="backButtonBlock">
      <button class="backButton" @click="goBack">
        Go back to the teams list
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { teamsURL } from '../../constants';
import TeamConfig from '../teamconfig/TeamConfig.vue';

export default {
  data() {
    return {
      isEditingTeamName: false,
      editingMemberField: {
        memberId: null,
        field: null,
      },
      teamName: '',
      editValue: '',
    };
  },
  computed: {
    ...mapGetters('teams', ['teams', 'teamId', 'editTeam', 'editMember']),

    selectedTeam() {
      const selectedTeam = this.teams.find((team) => team.id === this.teamId);
      return selectedTeam;
    },
  },
  methods: {
    ...mapActions('teams', ['fetchEditTeam', 'fetchEditMember']),

    editing(member, field) {
      return (
        this.editingMemberField.memberId === member.id &&
        this.editingMemberField.field === field
      );
    },

    startEditing(memberId, field, currentValue) {
      this.editingMemberField = { memberId, field };
      this.editValue = currentValue;
    },

    cancelEditing() {
      this.editingMemberField = { memberId: null, field: null };
      this.editValue = '';
    },

    handleSaveTeamName() {
      this.$store.commit('teams/SET_EDIT_TEAM_NAME', {
        teamName: this.teamName,
        teamId: this.selectedTeam.id,
      });
      this.$store.dispatch('teams/fetchEditTeam', teamsURL);
      this.isEditingTeamName = false;
    },
    startEditingTeamName() {
      this.teamName = this.selectedTeam.name;
      this.isEditingTeamName = true;
    },

    handleSaveMember() {
      const field = this.editingMemberField.field;
      const teamId = this.selectedTeam.id;
      const memberId = this.editingMemberField.memberId;

      if (field === 'name') {
        this.$store.commit('teams/SET_EDIT_MEMBER_NAME', {
          teamId,
          memberId,
          memberName: this.editValue,
        });
      } else if (field === 'role') {
        this.$store.commit('teams/SET_EDIT_MEMBER_ROLE', {
          teamId,
          memberId,
          memberRole: this.editValue,
        });
      } else if (field === 'email') {
        this.$store.commit('teams/SET_EDIT_MEMBER_EMAIL', {
          teamId,
          memberId,
          memberEmail: this.editValue,
        });
      }

      this.$store.dispatch('teams/fetchEditMember', teamsURL);
      this.cancelEditing();
    },

    goBack() {
      this.$store.commit('teams/SET_TEAM_ID', null);
    },
  },

  components: {
    TeamConfig,
  },
};
</script>

<style>
.teamBlock {
  margin-top: 50px;
  width: 1000px;
}

.selectedTeamCaption {
  font-size: 16px;
  margin-bottom: 14px;
  margin-top: 0;
  padding-top: 7px;
}

table {
  width: 100%;
  table-layout: fixed;
  font-size: 14px;
}

th,
td {
  width: 33.33%;
  border: 1px solid black;
  text-align: center;
  padding: 5px 10px;
  word-wrap: break-word;
}

.backButtonBlock {
  margin-top: 40px;
}

.backButton {
  border: none;
  outline: none;
  border-radius: 10px;
  height: 35px;
  padding: 5px 15px;
  font-size: 14px;
  cursor: pointer;
  background-color: transparent;
}

.backButton:hover {
  background: rgb(226, 226, 222);
}

.teamAndButton {
  display: flex;
  flex-direction: row;
}

.teamCaption {
  width: 125px;
}

.editButton {
  border: none;
  outline: none;
  border-radius: 10px;
  height: 35px;
  padding: 5px 15px;
  font-size: 13px;
  background-color: transparent;
  cursor: pointer;
}

.editButton:hover {
  background: rgb(226, 226, 222);
}

@media (max-width: 768px) {
  .selectedTeamCaption {
    font-size: 14px;
  }
  .teamBlock {
    width: 90%;
    overflow-x: auto;
  }

  .teamAndButton {
    gap: 2px;
  }

  table {
    font-size: 12px;
  }

  th,
  td {
    padding: 8px 5px;
  }

  .editButton {
    font-size: 12px;
  }

  .selectedTeamCaption {
    margin-top: 1.5px;
  }

  .backButton {
    font-size: 12px;
  }
}

.teamAndButton {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
