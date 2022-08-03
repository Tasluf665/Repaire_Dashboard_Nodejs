import React from "react";

import Select from "../../../features/Form/Select";
import Input from "../../../features/Form/Input";

export default function StatusInput({ edit, setSelectedStatus, order }) {
  const getOptions = () => {
    let array = [
      { id: 0, value: "Select" },
      { id: 1, value: "Pending" },
      { id: 2, value: "Accepted" },
      { id: 3, value: "Technician Assigned" },
      { id: 4, value: "Product Repaired" },
    ];
    return array.map((item) => (
      <option id={item.id} key={item.id}>
        {item.value}
      </option>
    ));
  };
  return (
    <>
      {edit ? (
        <Select
          title="Status"
          name="status"
          options={getOptions()}
          onChange={(value) => setSelectedStatus(value.target.value)}
        />
      ) : (
        <Input
          title="Status"
          defaultValue={order.status[order.status.length - 1].statusState}
          type="text"
        />
      )}
    </>
  );
}
