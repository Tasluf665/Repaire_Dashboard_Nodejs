export const get_order_td_item = (item) => {
  const arr = [];
  for (const key in item) {
    if (key !== "_id") {
      if (key === "status") {
        let color = "";
        switch (item[key]) {
          case "Pending":
            color = "red";
            break;
          case "Payment Complete":
            color = "Green";
            break;
          default:
            color = "Yellow";
            break;
        }

        arr.push(
          <td key={key} style={{ color: color, fontWeight: "500" }}>
            {item[key]}
          </td>
        );
      } else {
        arr.push(<td key={key}>{item[key]}</td>);
      }
    }
  }
  return arr;
};
