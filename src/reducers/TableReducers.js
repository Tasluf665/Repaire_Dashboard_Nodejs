export const initialState = {
  loading: true,
  error: null,
  data: [],
  currPage: 0,
  search: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "AddData":
      return { ...state, data: action.data, loading: false };
    case "Error":
      return { ...state, error: action.value };
    case "Search":
      return {
        ...state,
        search: action.search,
        data: action.data,
        currPage: action.currPage,
        loading: false,
      };
    case "Pagination":
      return {
        ...state,
        data: action.data,
        currPage: action.currPage,
        loading: false,
      };
    default:
      return state;
  }
};
