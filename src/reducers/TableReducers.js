export const ADD_DATA = "APP_DATA";
export const ERROR = "ERROR";
export const SEARCH = "SEARCH";
export const PAGINATION = "PAGINATION";

export const initialState = {
  loading: true,
  error: null,
  data: [],
  currPage: 0,
  search: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_DATA:
      return { ...state, data: action.data, loading: false };
    case ERROR:
      return { ...state, error: action.value };
    case SEARCH:
      return {
        ...state,
        search: action.search,
        data: action.data,
        currPage: action.currPage,
        loading: false,
      };
    case PAGINATION:
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
