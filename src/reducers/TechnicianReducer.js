export const ERROR = "ERROR";
export const LOADING = "LOADING";
export const FETCH_ALL_AGENTS_FROM_SERVER = "FETCH_ALL_AGENTS_FROM_SERVER";
export const FETCH_ALL_AGENTS_AND_TECHNICIANS_FROM_SERVER =
  "FETCH_ALL_AGENTS_AND_TECHNICIANS_FROM_SERVER";
export const DATA_ADDED_TO_SERVER = "DATA_ADDED_TO_SERVER";
export const DATA_UPDATED_TO_SERVER = "DATA_UPDATED_TO_SERVER";

export const initialState = {
  loading: true,
  error: null,
  allAgents: [],
  technician: null,
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
      return { ...state, loading: false, technician: action.value };
    case FETCH_ALL_AGENTS_FROM_SERVER:
      return {
        ...state,
        allAgents: action.value,
        loading: false,
      };
    case FETCH_ALL_AGENTS_AND_TECHNICIANS_FROM_SERVER:
      return {
        ...state,
        technician: action.value.technician,
        allAgents: action.value.allAgents,
        loading: false,
      };
    default:
      return state;
  }
};
