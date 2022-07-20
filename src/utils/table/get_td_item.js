export const get_td_item = (item) => {
  const arr = [];
  for (const key in item) {
    if (key !== "_id") arr.push(<td>{item[key]}</td>);
  }
  return arr;
};
