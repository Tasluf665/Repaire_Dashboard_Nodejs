import React from "react";

import { addAgent } from "../../server/Agent";
import FormPage from "../../features/Form/FormPage";

export default function AddAgents() {
  return <FormPage title="Agent" handleSubmit={addAgent} />;
}
