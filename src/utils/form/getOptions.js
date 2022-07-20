export const getOptions = (array) => {
  return array.map((item) => (
    <option id={item.id} key={item.id}>
      {item.displayName}
    </option>
  ));
};
