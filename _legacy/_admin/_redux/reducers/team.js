import {
  CREATE_TEAM,
  UPDATE_TEAM,
  SET_TEAMS,
  REMOVE_TEAM,
  CREATE_TEAM_MEMBER,
  REORDER_TEAM,
  REORDER_TEAM_MEMBER,
} from '../constants';


function immutableMove(arr, from, to) {
  return arr.reduce((prev, current, idx, self) => {
    if (from === to) {
      prev.push(current);
    }
    if (idx === from) {
      return prev;
    }
    if (from < to) {
      prev.push(current);
    }
    if (idx === to) {
      prev.push(self[from]);
    }
    if (from > to) {
      prev.push(current);
    }
    return prev;
  }, []);
}

function team(state, action) {
  switch(action.type) {
    case CREATE_TEAM:
      return action.payload.createTeam
    case UPDATE_TEAM:
      if (state.id === action.payload.id) {
        return action.payload
      }

      return state
    case CREATE_TEAM_MEMBER:{
      return {
        ...state,
        teamMembers: [...state.teamMembers, action.payload]
      }
    }

    case REORDER_TEAM_MEMBER:{
      if (state.id === action.payload.id_team) {
        return {
          ...state,
          teamMembers: immutableMove(state.teamMembers, action.payload.oldIndex, action.payload.newIndex)
        }
      }

      return state
    }
    default:
      return state
  }
}

export default function teams(state = [], action) {
  
  if (state === null) {
    return {};
  }

  switch (action.type) {

    case SET_TEAMS:
      return {
        ...state,
        teams:  action.payload
      };

    case UPDATE_TEAM:
      return {
        ...state,
       teams: state.teams.map(r => team(r, action))
      };

    case CREATE_TEAM:
      return {
        ...state,
        teams: [...state.teams, action.payload]
      };

    case CREATE_TEAM_MEMBER:
      return{
        ...state,
        teams: state.teams.map(r=> team(r, action))
      };

    case REMOVE_TEAM:
      return {
        ...state,
        teams: state.teams.filter(team => team.id !== action.payload.id)
      };

    case REORDER_TEAM:
      return {
        ...state,
        teams: immutableMove(state.teams, action.payload.oldIndex, action.payload.newIndex)
      }

    case REORDER_TEAM_MEMBER:
      return {
        ...state,
        teams: state.teams.map(r=> team(r, action))
      }
      
    default:
      return state;
  }
  
}