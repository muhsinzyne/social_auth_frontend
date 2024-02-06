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
  Toast: (message: string, status: SweetAlertIcon) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      customClass: {
        popup: "!p-[10px]",
        title: "font-normal", // Apply custom class to the toast title
      },
    });
    Toast.fire({
      icon: status,
      title: message,
    });
  },
  CustomToast: () => {
    // Define a custom Swal mixin for your toast style
    const CustomToast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      // timer: 3000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
      customClass: {
        popup:
          "inline-flex max-w-sm overflow-hidden bg-white rounded-lg shadow-md absolute top-20 z-20 !p-[0]",
      },
      html: `
    <div class="flex">
    <div class="flex items-center justify-center w-12 bg-green-500 rounded-full">
    <svg
      class="w-6 h-6 text-white fill-current"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
      />
    </svg>
  </div>
  <div class="px-4 py-4 -mx-3">
    <div class="mx-3">
      <p class="text-sm text-gray-600">Your account was registered!</p>
    </div>
  </div>
    </div>
  `,
    });

    //   <div
    //   class="inline-flex max-w-sm ml-4 overflow-hidden bg-white rounded-lg shadow-md absolute top-20 right-4 z-20"
    // >
    //   <div class="flex items-center justify-center w-12 bg-green-500">
    //     <svg
    //       class="w-6 h-6 text-white fill-current"
    //       viewBox="0 0 40 40"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
    //       />
    //     </svg>
    //   </div>

    //   <div class="px-4 py-4 -mx-3">
    //     <div class="mx-3">

    //       <p class="text-sm text-gray-600">
    //         Your account was registered!
    //       </p>
    //     </div>
    //   </div>
    // </div>

    // Usage:
    CustomToast.fire();
  },
};

export default SWALL;
