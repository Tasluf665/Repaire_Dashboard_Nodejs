import { showResultAnimation } from "../../../utils/showResultAnimation";

export const updateUserDetails = async (data, currentUser) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/users/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": currentUser.token,
        },
        body: JSON.stringify(data),
      }
    );

    let result = await response.json();

    if (!result.error) {
      showResultAnimation(result, result.success);
    } else {
      showResultAnimation(result);
    }
  } catch (ex) {
    console.log(
      "🚀 ~ file: Profile.jsx ~ line 36 ~ updateUserDetails ~ ex",
      ex
    );
  }
};
