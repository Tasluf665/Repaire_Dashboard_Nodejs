import React from "react";
import Input from "../../../features/Form/Input";

export default function DisableInputItem({ state, edit }) {
  let data = [
    { title: "Name", defaultValue: state.order.name },
    { title: "Phone", defaultValue: state.order.phone },
    {
      title: "Address",
      defaultValue: state.order.address,
      cutomeClass: "col-12 mb-3",
    },
    {
      title: "Booking Time",
      defaultValue: new Date(state.order.bookingTime).toLocaleDateString(),
    },
    {
      title: "Arrival Time",
      defaultValue:
        new Date(state.order.arrivalDate).toLocaleDateString() +
        ", " +
        new Date(state.order.arrivalTime).toLocaleTimeString(),
    },
    { title: "Category", defaultValue: state.order.category },
    { title: "Category Type", defaultValue: state.order.categoryType },
    { title: "Brand", defaultValue: state.order.brand },
    { title: "Model", defaultValue: state.order.model },
  ];
  return (
    <>
      {data.map((item) => {
        return (
          <Input
            title={item.title}
            defaultValue={item.defaultValue}
            type="text"
            disabled={edit}
            cutomeClass={item.cutomeClass}
          />
        );
      })}
    </>
  );
}
