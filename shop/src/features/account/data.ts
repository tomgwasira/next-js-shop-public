import djangoShopApi from '../../config/djangoShopApi';
import nextApi from '../../config/nextApi';

/**
 * Data service for user account.
 */
export default class AccountDataService {
  static djangoShopApiGetUser(access: string) {
    return djangoShopApi.get<any>('/account/', {
      headers: {
        Authorization: `JWT ${access}`,
      },
    });
  }

  static nextApiGetUser() {
    return nextApi.get<any>('/account');
  }
}
