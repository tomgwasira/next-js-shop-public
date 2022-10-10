import { Dispatch, SetStateAction } from 'react';

import { ProductImage } from '../../common/interfaces/Products';

export interface ProductDetailOptionValue {
  id: number;
  name: string;
  option_type: ProductDetailOptionType;
}

export interface ProductDetailOptionType {
  id: number;
  name: string;
  display_name: string;
  option_values: ProductDetailOptionValue[];
}

export interface ProductDetailProductVariant {
  id: number;
  option_values: ProductDetailOptionValue[];
}

export interface ProductDetailProduct {
  name: string;
  slug: string;
  description: string;
  product_images: ProductImage[];
  option_types: ProductDetailOptionType[];
  product_variants: ProductDetailProductVariant[];
}

export interface ProductOptionValue {
  name: string;
}

export interface ProductDetailRestructuredOptionValue {
  id: number;
  name: string;
}

// export interface ProductDetailRestructuredOptionType {
//   id: number;
//   name: string;
//   displayName: string;
//   optionValues: ProductDetailRestructuredOptionValue[];
//   optionValueIds: number[];
// }
