import * as React from 'react';

import image_placeholder from '../../common/assets/image-placeholder.jpg';
import { ProductListingProduct } from './ProductListingInterfaces';

interface ProductListingItemProps {
  product: ProductListingProduct;
}

export default function ProductListingItem({ product }: ProductListingItemProps) {
  // Use either first image in list (for simplicity) or placeholder image
  // if image list is empty.
  let image;

  if (product.product_images.length) {
    image = (
      <img
        src={product.product_images[0].image}
        alt={product.product_images[0].alt_text}
        className="w-full h-full object-center object-cover group-hover:opacity-75"
      />
    );
  } else {
    image = (
      <img
        src={image_placeholder.src}
        alt={product.name}
        className="w-full h-full object-center object-cover group-hover:opacity-75"
      />
    );
  }

  return (
    <a key={product.id} href={'products/'.concat(product.slug)} className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        {image}
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        {product.min_price_currency} {product.min_price}
      </p>
    </a>
  );
}
