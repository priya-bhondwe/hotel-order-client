import API from "../api/API";
import endpoints from "../api/endpoints";
import User from "../shared/models/UserModels";

class AuthService {
  static userLogin(user: User) {
    return API.post(endpoints.api.auth.userLogin, user);
  }

  static sendPasswordResetLink(email: string) {
    return API.post(endpoints.api.auth.passwordResetLink, { email });
  }

  static validateToken(token: string) {
    return API.post(endpoints.api.auth.validateToken, { token });
  }

  static refreshToken(token: string) {
    return API.post(endpoints.api.auth.refreshToken, { token });
  }
}
export default AuthService;
