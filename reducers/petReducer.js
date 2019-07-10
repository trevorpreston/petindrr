import fetchInitialPets from '../actions/petActions';

const initialState = {
  pets: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_INITIAL_PETS':
        return { ...state, loading: true };
      case 'FETCH_INITIAL_PETS_SUCCESS':
        return { ...state, loading: false, pets: action.payload.data };
      case 'FETCH_INITIAL_PETS_FAIL':
        return {
          ...state,
          loading: false,
          error: 'Error while fetching Pets'
        };
   default:
    return state
  }
 }

