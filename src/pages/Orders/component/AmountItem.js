import React from "react";

import Input from "../../../features/Form/Input";

export default function AmountItem({ edit, selectedStatus, order }) {
  return (
    <>
      {edit ? (
        selectedStatus === "Product Repaired" ? (
          <Input title="Amount" type="text" name="amount" />
        ) : null
      ) : null}

      {order.amount && selectedStatus !== "Product Repaired" ? (
        <Input
          title="Amount"
          defaultValue={order.amount}
          type="text"
          disabled={!edit}
        />
      ) : null}
    </>
  );
}
