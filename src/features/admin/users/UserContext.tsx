import { createContext } from "react";
import User from "../../../shared/models/UserModels";

interface IUserContext {
  open: boolean;
  operation: string;
  onClose: (e?: any) => void;
  loadUsers: () => void;
  selectedUser: User;
}

const UserContext = createContext<IUserContext>({
  open: false,
  operation: "add",
  onClose: () => {},
  loadUsers: () => {},
  selectedUser: {},
});

export default UserContext;
