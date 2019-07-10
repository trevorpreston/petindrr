export function fetchInitialPets() {
  return {
    type: 'FETCH_INITIAL_PETS',
    payload: {
      request: {
        url: 'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/pets.json'
      }
    }
  };
}