import { toast } from "react-toastify";

export const successMessage = (message: string) => toast.success(message);
export const errorMessage = (message: string) => toast.error(message);
export const warningMessage = (message: string) => toast.warn(message);
