const initialState = {
  pictureList: [],
  selectedPicture: null
}

const pictures = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PICTURES':
      return state
    case 'FETCH_PICTURES_SUCCESS':
      return {
        ...state,
        pictureList: [...state.pictureList, ...action.data]
      };
    case 'SELECT_PICTURE':
      return {
        ...state,
        [state.selectedPicture]: action.data
      }
    default:
      return state;
  }
};

export default pictures;