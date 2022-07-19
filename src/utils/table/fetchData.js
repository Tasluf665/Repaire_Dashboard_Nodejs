export const fetchData = async (
  jwtToken,
  linkName,
  pageNumber,
  pageSize,
  name
) => {
  const res = await fetch(
    name
      ? `http://localhost:3001/api/${linkName}?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}`
      : `http://localhost:3001/api/${linkName}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      headers: {
        "x-auth-token": jwtToken,
      },
    }
  );
  const data = await res.json();
  return data;
};
