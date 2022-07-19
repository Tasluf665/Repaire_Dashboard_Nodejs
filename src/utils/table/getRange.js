export const getRange = (count) => {
  let pages = 1;

  let page = Math.floor(count / 10);
  pages = count % 10 === 0 ? page : page + 1;
  let range = [...Array(pages).keys()];

  return range;
};
