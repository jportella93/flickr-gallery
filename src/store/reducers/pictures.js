const initialState = {
  pictureList: [],
  selectedPicture: null,
  isLoading: false,
  error: null,
}

// Discard fetched pics that are already in the store
const discardRepeatedPics = (baseArr, newArr) => {
  const res = [];
  newArr.forEach(newPic => {
    if (baseArr.every(oldPic => newPic.id !== oldPic.id)) res.push(newPic)
  })
  return res
}

const pictures = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PICTURES':
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case 'FETCH_PICTURES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        pictureList: [
          ...state.pictureList,
          ...discardRepeatedPics(state.pictureList, action.data)
        ]
      };
    case 'FETCH_PICTURES_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error || 'Failed to load pictures.',
      };
    case 'SELECT_PICTURE':
      return {
        ...state,
        selectedPicture: action.data
      }
    default:
      return state;
  }
};

export default pictures;