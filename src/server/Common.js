export const objectToArray = (data) => {
  let array = [];
  let i = 1;
  for (let item in data) {
    data[item].key = item;
    data[item].countId = i;
    array.push(data[item]);
    i++;
  }
  return array;
};
