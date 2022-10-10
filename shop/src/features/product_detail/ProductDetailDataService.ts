/**
 * Data service for product detail page data.
 * @module DataService
 */

import djangoShopApi from '../../config/djangoShopApi';
import { ProductDetailProduct } from './ProductDetailInterfaces';

export default class ProductDetailDataService {
  /**
   * Obtain data about product represented by given slug for product detail page.
   *
   * @param {string} slug - The slug representing the product whose data is to be obtained.
   * @returns {ProductDetailProduct} Product object for given slug.
   */
  static getProduct(slug: string) {
    return djangoShopApi.get<ProductDetailProduct>('/products/'.concat(slug));
  }

  /**
   * Organise options data for a given product into an array of option types with each option type
   * having an array of option values.
   *
   * @param {ProductDetailProduct} product - The product object whose data is to be organised.
   * @returns {Object} Object containing collections of product options and product variants in
   * format required for product detail page.
   */
  static getOptionTypes(product: ProductDetailProduct) {
    const optionTypes: { [key: number]: any } = {};

    product.product_variants.forEach((productVariant) => {
      productVariant.option_values.forEach((optionValue) => {
        const optionType = optionValue.option_type;

        if (optionType.id in optionTypes) {
          if (!optionTypes[optionType.id].optionValueIds.includes(optionValue.id)) {
            optionTypes[optionType.id].optionValues.push({
              id: optionValue.id,
              name: optionValue.name,
            });
            optionTypes[optionType.id].optionValueIds.push(optionValue.id);
          }
        } else {
          optionTypes[optionType.id] = {
            id: optionType.id,
            name: optionType.name,
            displayName: optionType.display_name,
            optionValues: [{ id: optionValue.id, name: optionValue.name }],
            optionValueIds: [optionValue.id],
          };
        }
      });
    });

    return Object.values(optionTypes);
  }

  /**
   * TO-DO: Consider merging with getOptionValues after testing time.
   * Happens at the expense of complex, intricate code.
   * @param product
   * @returns
   */
  static getProductVariants(product: ProductDetailProduct) {
    const leanProductVariants: any = {};

    product.product_variants.forEach((productVariant) => {
      const leanProductVariant: any = {};

      productVariant.option_values.forEach((optionValue) => {
        const optionType = optionValue.option_type;
        leanProductVariant[optionType.id] = optionValue.id;
      });

      leanProductVariants[productVariant.id] = leanProductVariant;
    });

    return leanProductVariants;
  }
}
