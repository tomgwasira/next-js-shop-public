import djangoShopApi from '../../config/djangoShopApi';
import nextApi from '../../config/nextApi';

/**
 * Data service for user login.
 */
export default class AuthDataService {
  static nextApiSubmitLoginForm(data: any) {
    return nextApi.post<any>('/login', data);
  }

  static djangoShopApiSubmitLoginForm(data: any) {
    return djangoShopApi.post<any>('/token/', data);
  }

  static nextApiGetAuthUser() {
    return nextApi.get<any>('/auth/auth-user');
  }

  static djangoShopApiGetAuthUser(access: string) {
    return djangoShopApi.get<any>('/auth-user/', {
      headers: {
        Authorization: `JWT ${access}`,
      },
    });
  }

  static nextApiVerifyAccessToken() {
    return nextApi.get<any>('/auth/verify');
  }

  static djangoShopApiVerifyAccessToken(data: any) {
    return djangoShopApi.post<any>('/token/verify/', data);
  }

  static nextApiRefreshTokens() {
    return nextApi.get<any>('/auth/refresh');
  }

  static djangoShopApiRefreshTokens(data: any) {
    return djangoShopApi.post<any>('/token/refresh/', data);
  }
}
