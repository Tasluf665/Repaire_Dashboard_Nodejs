export const get_td_item = (item) => {
  const arr = [];
  for (const key in item) {
    if (key !== "_id") arr.push(<td key={key}>{item[key]}</td>);
  }
  return arr;
};
