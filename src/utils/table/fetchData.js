export const fetchData = async (
  jwtToken,
  linkName,
  pageNumber,
  pageSize,
  name
) => {
  const res = await fetch(
    name
      ? `${process.env.REACT_APP_BACKEND_BASE_URL}/api/${linkName}?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}`
      : `${process.env.REACT_APP_BACKEND_BASE_URL}/api/${linkName}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      headers: {
        "x-auth-token": jwtToken,
      },
    }
  );
  const data = await res.json();
  return data;
};
