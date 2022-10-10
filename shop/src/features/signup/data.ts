import djangoShopApi from '../../config/djangoShopApi';
import nextApi from '../../config/nextApi';

/**
 * Data service for customer signups.
 */
export default class SignupDataService {
  static djangoShopApiSubmitSignupForm(data: any) {
    return djangoShopApi.post<any>('/signup/', data);
  }

  static nextApiSubmitSignupForm(data: any) {
    return nextApi.post<any>('/signup', data);
  }
}
