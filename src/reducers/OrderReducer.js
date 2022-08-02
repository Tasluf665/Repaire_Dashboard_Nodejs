export const ERROR = "ERROR";
export const LOADING = "LOADING";
export const FETCH_DATA_FROM_SERVER = "FETCH_DATA_FROM_SERVER";
export const DATA_ADDED_TO_SERVER = "DATA_ADDED_TO_SERVER";
export const DATA_UPDATED_TO_SERVER = "DATA_UPDATED_TO_SERVER";

export const initialState = {
  loading: true,
  error: null,
  order: null,
  technicians: [],
  agents: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: action.value };
    case DATA_ADDED_TO_SERVER:
      return { ...state, loading: false };
    case DATA_UPDATED_TO_SERVER:
      return { ...state, loading: false, order: action.value };
    case FETCH_DATA_FROM_SERVER:
      return {
        ...state,
        order: { ...action.value.order },
        agents: [...action.value.agents],
        technicians: [...action.value.technicians],
        loading: false,
      };
    default:
      return state;
  }
};
