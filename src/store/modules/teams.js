// make separate file for getInitialState and state
const getInitialEditState = () => {
  return {
    editTeam: {
      editTeamName: '',
      editTeamId: null,
    },
    editMember: {
      memberTeamId: null,
      memberId: null,
      memberName: '',
      memberRole: '',
      memberEmail: '',
    },
  };
};

const state = () => {
  return {
    isLoading: false,
    teams: [],
    teamId: null,
    searchedValue: '',
    ...getInitialEditState(),
  };
};

// make separate file
const mutations = {
  SET_TEAMS(state, teamsValue) {
    state.teams = teamsValue;
  },

  SET_LOADING(state, isLoadingValue) {
    state.isLoading = isLoadingValue;
  },

  SET_TEAM_ID(state, teamIdValue) {
    state.teamId = teamIdValue;
  },

  SET_SEARCHED_VALUE(state, value) {
    state.searchedValue = value;
  },

  SET_CANCEL_EDIT(state) {
    const { editTeam, editMember } = getInitialEditState();
    state.editTeam = editTeam;
    state.editMember = editMember;
  },

  SET_EDIT_TEAM_NAME(state, { teamName, teamId }) {
    state.editTeam.editTeamName = teamName;
    state.editTeam.editTeamId = teamId;
  },

  SET_EDIT_MEMBER_NAME(state, { teamId, memberId, memberName }) {
    state.editMember.memberTeamId = teamId;
    state.editMember.memberId = memberId;
    state.editMember.memberName = memberName;
  },

  SET_EDIT_MEMBER_ROLE(state, { teamId, memberId, memberRole }) {
    state.editMember.memberTeamId = teamId;
    state.editMember.memberId = memberId;
    state.editMember.memberRole = memberRole;
  },

  SET_EDIT_MEMBER_EMAIL(state, { teamId, memberId, memberEmail }) {
    state.editMember.memberTeamId = teamId;
    state.editMember.memberId = memberId;
    state.editMember.memberEmail = memberEmail;
  },
};

// make separate file
const actions = {
  async fetchTeams({ commit }, teamsURL) {
    commit('SET_LOADING', true);
    try {
      const loadedResponse = await fetch(teamsURL);
      const finalResponse = await loadedResponse.json();
      commit('SET_TEAMS', finalResponse);
    } catch (error) {
      console.error('Failed to fetch teams: ', error);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async fetchEditTeam({ commit, state }, teamsURL) {
    try {
      const editTeam = state.editTeam;
      const teams = state.teams;

      const response = await fetch(`${teamsURL}/${editTeam.editTeamId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
          name: editTeam.editTeamName,
        }),
      });

      if (!response.ok) {
        console.log('Failed to update team');
        return;
      }

      const team = teams.find((team) => team.id === editTeam.editTeamId);

      if (!team) {
        console.log('Team not found');
        return;
      }

      const updatedTeam = {
        ...team,
        name: editTeam.editTeamName,
      };

      const updatedTeams = teams.map((team) => {
        return team.id === editTeam.editTeamId ? updatedTeam : team;
      });

      commit('SET_TEAMS', updatedTeams);
      commit('SET_CANCEL_EDIT');
    } catch (error) {
      console.error('Error occurred during team update:', error);
    }
  },

  async fetchEditMember({ commit, state }, teamsURL) {
    const { memberTeamId, memberId, memberName, memberRole, memberEmail } =
      state.editMember;

    const teams = state.teams;

    const team = teams.find((t) => t.id === memberTeamId);
    if (!team) {
      console.error('Team not found');
      return;
    }

    const updatedMembers = team.members.map((member) => {
      if (member.id === memberId) {
        return {
          ...member,
          name: memberName || member.name,
          role: memberRole || member.role,
          email: memberEmail || member.email,
        };
      }
      return member;
    });

    const updatedTeam = {
      ...team,
      members: updatedMembers,
    };

    try {
      const response = await fetch(`${teamsURL}/${memberTeamId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTeam),
      });

      if (!response.ok) {
        console.error('Failed to update team (with new member values)');
        return;
      }

      const updatedTeams = teams.map((t) =>
        t.id === memberTeamId ? updatedTeam : t
      );

      commit('SET_TEAMS', updatedTeams);
      commit('SET_CANCEL_EDIT');
    } catch (error) {
      console.error('Error while saving member:', error);
    }
  },
};

// make separate file
const getters = {
  teamId: (state) => state.teamId,
  teams: (state) => state.teams,
  isLoading: (state) => state.isLoading,
  searchedValue: (state) => state.searchedValue,
  foundValue: (state) => {
    const search = (state.searchedValue || '').toLowerCase();
    return state.teams.filter((team) =>
      team.name.toLowerCase().includes(search)
    );
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
