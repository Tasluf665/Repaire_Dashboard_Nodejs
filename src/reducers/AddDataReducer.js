export const initialState = {
  loading: true,
  error: null,
  data: [],
  allAgents: [],
  agent: null,
  technician: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "DataAddedToServer":
      console.log("DataAddedToServer");
      return { ...state, loading: false };
    case "Error":
      return { ...state, error: action.value };
    case "AddAgents":
      return {
        ...state,
        allAgents: action.value,
        loading: false,
      };
    case "AgentFetch":
      return {
        ...state,
        agent: action.value,
        loading: false,
      };
    case "Technician_And_Agent_Fetch":
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
