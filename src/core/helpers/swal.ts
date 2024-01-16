import Swal, { SweetAlertIcon } from "sweetalert2";

const SWALL = {
  Email: async () => {
    const { value: email } = await Swal.fire({
      title: "Input email address",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address",
    });
    if (email) return email;
  },
  Timer: (message: string, status: SweetAlertIcon) => {
    Swal.fire({
      text: message,
      icon: status,
      buttonsStyling: false,
      heightAuto: false,
      showConfirmButton: false,
      timer: 1500,
    });
  },
  ConfirmCancel: (
    text: string,
    icon: SweetAlertIcon,
    showConfirmButton: boolean,
    confirmButtonText: string,
    showCancelButton?: boolean,
    cancelButtonText?: string
  ) =>
    Swal.fire({
      text,
      icon,
      buttonsStyling: false,
      heightAuto: false,
      showCancelButton,
      showConfirmButton,
      customClass: {
        confirmButton:
          "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
        cancelButton:
          "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
      },
      confirmButtonText,
      cancelButtonText,
    }),
};

export default SWALL;
