import React from "react";

import { handleSubmit } from "../../server/Agent";
import CommonAddPage from "../../components/custome/CommonAddPage";

export default function AddAgents() {
  return <CommonAddPage title="Agent" handleSubmit={handleSubmit} />;
}
