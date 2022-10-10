import djangoShopApi from '../../config/djangoShopApi';
import nextApi from '../../config/nextApi';

/**
 * Data service for user logout.
 */
export default class LogoutDataService {
  // static djangoShopApiLogout(data: any) {
  //   return djangoShopApi.post<any>('/logout/', data);
  // }

  static nextApiLogout() {
    return nextApi.get<any>('/logout');
  }
}
