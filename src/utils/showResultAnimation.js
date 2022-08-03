import Swal from "sweetalert2";

export const showResultAnimation = (result, title) => {
  if (result.error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: result.error,
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "success",
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
