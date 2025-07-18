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
                v-model="editValue"
                @save="handleSaveMember"
                @cancel="cancelEditing"
              />
            </div>
            <div class="nameCell" v-else>
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
                v-model="editValue"
                @save="handleSaveMember"
                @cancel="cancelEditing"
              />
            </div>

            <div class="nameCell" v-else>
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
                v-model="editValue"
                @save="handleSaveMember"
                @cancel="cancelEditing"
              />
            </div>

            <div class="nameCell" v-else>
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
import { mapGetters, mapActions, mapMutations } from 'vuex';
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
    ...mapMutations('teams', [
      'SET_EDIT_TEAM_NAME',
      'SET_EDIT_MEMBER_NAME',
      'SET_EDIT_MEMBER_ROLE',
      'SET_EDIT_MEMBER_EMAIL',
      'SET_TEAM_ID',
    ]),

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
      this.SET_EDIT_TEAM_NAME({
        teamName: this.teamName,
        teamId: this.selectedTeam.id,
      });
      this.fetchEditTeam(teamsURL);
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
        this.SET_EDIT_MEMBER_NAME({
          teamId,
          memberId,
          memberName: this.editValue,
        });
      } else if (field === 'role') {
        this.SET_EDIT_MEMBER_ROLE({
          teamId,
          memberId,
          memberRole: this.editValue,
        });
      } else if (field === 'email') {
        this.SET_EDIT_MEMBER_EMAIL({
          teamId,
          memberId,
          memberEmail: this.editValue,
        });
      }

      this.fetchEditMember(teamsURL);
      this.cancelEditing();
    },

    goBack() {
      this.SET_TEAM_ID(null);
    },
  },

  components: {
    TeamConfig,
  },
};
</script>

<style>
.teamBlock {
  margin-top: 150px;
  width: 900px;
}

h2 {
  margin: 0 0 0 2px;
}

.selectedTeamCaption {
  font-size: 16px;
  margin-bottom: 14px;
  margin-top: 40px;
  padding-top: 7px;
  margin-right: 5px;
}

table {
  width: 100%;
  table-layout: fixed;
  font-size: 14px;
}

tr {
  height: 40px;
}

th,
td {
  border: 1px solid black;
  text-align: center;
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
  margin-top: 35px;
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

.nameCell {
  padding-bottom: 10px;
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
