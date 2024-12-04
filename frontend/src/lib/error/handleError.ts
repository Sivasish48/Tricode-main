import { toast } from "sonner";

const toastClass =
  "bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all duration-300 ease-in-out transform";

export const showToast = {
  success: (message: string) => {
    toast.success(message, { className: toastClass });
  },
  error: (message: string) => {
    toast.error(message, { className: toastClass });
  },
  info: (message: string) => {
    toast(message, { className: toastClass });
  },
};
