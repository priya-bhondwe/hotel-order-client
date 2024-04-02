interface Name {
  first: string;
  last: string;
}
interface User {
  _id?: string;
  userId?: number;
  name?: Name;
  email?: string;
  mobile?: string;
  status?: number;
  createAt?: string;
  role?: string;
  avatar?: string;
  password?: string;
}

export default User;
