export default function reducer(state = {}, action) {
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
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          profile: action.payload
        }
      }
    case 'UPDATE_MIN_AGE':
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          ageRange: {
            ...state.userSettings.ageRange,
            min: action.payload
          }
        }
      }
    case 'UPDATE_MAX_AGE':
        return {
          ...state,
          userSettings: {
            ...state.userSettings,
            ageRange: {
              ...state.userSettings.ageRange,
              max: action.payload
            }
          }
        }
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

export function updateMinAge(value) {
  console.log('value', value)
  return {
    type: 'UPDATE_MIN_AGE',
    payload: value
  }
}

export function updateMaxAge(value) {
  return {
    type: 'UPDATE_MAX_AGE',
    payload: value
  }
}
