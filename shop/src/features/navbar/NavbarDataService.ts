import djangoShopApi from '../../config/djangoShopApi';
import { Category } from './NavbarInterfaces';

export default class NavbarDataService {
  static getAllCategories() {
    return djangoShopApi.get<Category[]>('/categories');
  }
}
