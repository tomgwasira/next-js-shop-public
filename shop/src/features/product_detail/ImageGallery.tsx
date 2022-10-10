import * as React from 'react';
// interface ProductImage {
//   src: string;
//   alt: string;
// }

import { ProductImage } from '../../common/interfaces/Products';

interface ImageGalleryProps {
  images: ProductImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
      {/* Main Image */}
      <div className="aspect-w-3 aspect-h-4 rounded-lg lg:block">
        <img
          src={images[0].image}
          alt={images[0].alt_text}
          className="w-full h-full object-center object-cover"
        />
      </div>
      {/* /Main Image */}
      <div className="lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2">
        <div className="max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img
                src={images[1].image}
                alt={images[1].alt_text}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img
                src={images[2].image}
                alt={images[2].alt_text}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
          <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
            <img
              src={images[3].image}
              alt={images[3].alt_text}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
