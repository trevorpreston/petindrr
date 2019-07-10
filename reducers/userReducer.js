import { fetchInitialSettings, updateProfile, updateMinAge, updateMaxAge, togglePetPreference } from '../actions/userActions';

const initialState = {
  userSettings: {
    profile: 'hiii',
    typePreference: '',
    ageRange: {
      min: 0,
      max: 0
    }
  }
}

export default function reducer(state = initialState, action) {
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
    case 'TOGGLE_TYPE_PREFERENCE':
        return {
          ...state,
          userSettings: {
            ...state.userSettings,
            typePreference: action.payload
          }
        }
    default:
      return state;
  }
}

