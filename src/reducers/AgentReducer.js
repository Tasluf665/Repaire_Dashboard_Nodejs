export const ERROR = "ERROR";
export const LOADING_COMPLETE = "LOADING_COMPLETE";
export const LOADING = "LOADING";
export const DATA_ADDED_TO_SERVER = "DATA_ADDED_TO_SERVER";
export const DATA_UPDATED_TO_SERVER = "DATA_UPDATED_TO_SERVER";
export const FETCH_DATA_FROM_SERVER = "FETCH_DATA_FROM_SERVER";

export const initialState = {
  loading: true,
  error: null,
  agent: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case LOADING_COMPLETE:
      return { ...state, loading: false };
    case ERROR:
      return { ...state, error: action.value };
    case DATA_ADDED_TO_SERVER:
      return { ...state, loading: false };
    case DATA_UPDATED_TO_SERVER:
      return { ...state, loading: false, agent: action.value };
    case FETCH_DATA_FROM_SERVER:
      return {
        ...state,
        agent: action.value,
        loading: false,
      };
    default:
      return state;
  }
};
