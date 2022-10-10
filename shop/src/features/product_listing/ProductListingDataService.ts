import djangoShopApi from '../../config/djangoShopApi';
import { ProductListingProduct } from './ProductListingInterfaces';

class ProductListingDataService {
  getAll() {
    return djangoShopApi.get<ProductListingProduct[]>('/products');
  }
}

export default new ProductListingDataService();
