import React from "react";

import Input from "../../../features/Form/Input";

export default function ProblemNoteInput({ order }) {
  return (
    <>
      <Input
        title="Problem"
        defaultValue={order.problem}
        type="text"
        name="problem"
        cutomeClass="col-12 mb-3"
      />
      <Input title="Note" defaultValue={order.note} type="text" name="note" />
    </>
  );
}
