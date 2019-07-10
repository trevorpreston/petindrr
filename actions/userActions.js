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

export function togglePetPreference(value) {
  return {
    type: 'TOGGLE_TYPE_PREFERENCE',
    payload: value
  }
}
