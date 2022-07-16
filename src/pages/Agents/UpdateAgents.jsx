import React, { useState } from "react";

import { handleSubmit } from "../../server/Agent";
import CommonUpdatePage from "../../components/custome/CommonUpdatePage";

export default function UpdateAgents(props) {
  const [edit, setEdit] = useState(false);
  return (
    <CommonUpdatePage
      title="Agent"
      location={props.location}
      handleSubmit={handleSubmit}
      edit={edit}
      setEdit={setEdit}
    />
  );
}
