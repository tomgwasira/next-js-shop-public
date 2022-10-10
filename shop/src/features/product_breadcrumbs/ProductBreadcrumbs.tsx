import * as React from "react";
import {
  BreadcrumbCategory,
  BreadcrumbProduct,
} from "./ProductBreadcrumbsInterfaces";

interface ProductBreadcrumbsProps {
  categories: BreadcrumbCategory[];
  product?: BreadcrumbProduct;
}

export default function ProductBreadcrumbs({
  categories,
  product,
}: ProductBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        role="list"
        className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        {/* Categories Breadcrumbs */}
        {categories.map((category) => (
          <li key={category.id}>
            <div className="flex items-center">
              <a
                href={category.slug}
                className="mr-2 text-sm font-medium text-gray-900"
              >
                {category.name}
              </a>
              <svg
                width={16}
                height={20}
                viewBox="0 0 16 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-4 h-5 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
        ))}
        {/* /Categories Breadcrumbs */}

        {/* Product Breadcrumbs */}
        {product && (
          <li className="text-sm">
            <a
              href={product.slug}
              aria-current="page"
              className="font-medium text-gray-500 hover:text-gray-600"
            >
              {product.name}
            </a>
          </li>
        )}
        {/* /Product Breadcrumbs */}
      </ol>
    </nav>
  );
}
