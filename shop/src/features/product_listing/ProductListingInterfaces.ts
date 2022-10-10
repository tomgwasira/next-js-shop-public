import { ProductImage } from '../../common/interfaces/Products';

export interface ProductListingProduct {
  id: number;
  name: string;
  slug: string;
  min_price: number;
  min_price_currency: string;
  max_price: number;
  max_price_currency: string;
  min_price_original: number;
  min_price_original_currency: string;
  max_price_original: number;
  max_price_original_currency: string;
  product_images: ProductImage[];
}
