export default function reducer(state = {}, action) {
  console.log(action.payload);
  switch (action.type) {
    case 'FETCH_INITIAL_SETTINGS':
      return { ...state, loading: true };
    case 'FETCH_INITIAL_SETTINGS_SUCCESS':
      return { ...state, loading: false, userSettings: action.payload.data };
    case 'FETCH_INITIAL_SETTINGS_FAIL':
      return {
        ...state,
        loading: false,
        error: 'Error while fetching settings'
      };
    case 'UPDATE_PROFILE':
      console.log(state)
      return Object.assign({}, state, {userSettings: {...state.userSettings, profile: action.payload} })
    default:
      return state;
  }
}

export function fetchInitialSettings() {
  return {
    type: 'FETCH_INITIAL_SETTINGS',
    payload: {
      request: {
        url: 'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/settings.json'
      }
    }
  };
}

export function updateProfile(value) { 
  return {
    type: 'UPDATE_PROFILE',
    payload: value
  }
}

export function getProfile(value) { 
  return {
    type: 'UPDATE_PROFILE',
    payload: t
  }
}
