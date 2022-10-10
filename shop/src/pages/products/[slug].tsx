import * as React from 'react';

import MainLayout from '../../common/layouts/MainLayout';
import Description from '../../features/product_detail/Description';
import ImageGallery from '../../features/product_detail/ImageGallery';
import OptionType from '../../features/product_detail/OptionType';
import ProductDetailDataService from '../../features/product_detail/ProductDetailDataService';
import { ProductDetailProduct } from '../../features/product_detail/ProductDetailInterfaces';
import ProductListingDataService from '../../features/product_listing/ProductListingDataService';

interface ProductDetailProps {
  product: ProductDetailProduct;
}

function ProductDetail({ product }: ProductDetailProps) {
  // Initial active options
  const initialOptionTypes = {};
  product.option_types.forEach((optionType, index) => {
    initialOptionTypes[optionType.id] = {
      id: optionType.id,
      position: index,
      optionValues: optionType.option_values,
      selectedOptionValue: '',
      activeOptionValueIds: [],
    };

    // Activate all option values on first level
    if (index === 0) {
      initialOptionTypes[optionType.id].activeOptionValueIds = optionType.option_values.map(
        (optionValue) => optionValue.id
      );
    }
  });

  // State to capture all options selected
  const [selectedOptions, setSelectedOptions] = React.useState({});
  const [optionTypes, setOptionTypes] = React.useState(initialOptionTypes);

  const handleOptionValueSelection = (optionType, selectedOptionValueId) => {
    // Add optionType.position, optionTypeId and optionValueId for current option selection
    setSelectedOptions((prevSelectedOptions) => {
      prevSelectedOptions[optionType.id] = {
        optionTypePosition: optionType.position,
        optionValueId: selectedOptionValueId,
      };
      return prevSelectedOptions;
    });

    // Clear any previously selected options for an option type below current selected option type
    Object.keys(selectedOptions).forEach((selectedOptionTypeId) => {
      if (
        optionType.position < parseInt(selectedOptions[selectedOptionTypeId].optionTypePosition, 10)
      ) {
        setSelectedOptions((prevSelectedOptions) => {
          delete prevSelectedOptions[selectedOptionTypeId];
          return prevSelectedOptions;
        });
      }
    });

    // Iterate over selected options not product variants
    const productVariantFilter = (productVariant: any) => {
      let result = true;
      Object.keys(selectedOptions).forEach((selectedOptionTypeId: any) => {
        if (
          !(
            // Compare option values for selected option and option id pair
            (
              selectedOptions[selectedOptionTypeId].optionValueId ===
              productVariant.option_types[selectedOptionTypeId].option_value.id
            )
          )
        ) {
          result = false;
        }
      });

      return result;
    };

    // Filter all product variants that match the selected options
    const availableProductVariants = product.product_variants.filter((productVariant) =>
      productVariantFilter(productVariant)
    );

    setOptionTypes((prevOptionTypes) => {
      const newOptionTypes = { ...prevOptionTypes };

      // Set currently selected option type
      newOptionTypes[optionType.id].selectedOptionValue = selectedOptionValueId;

      // Clear option values for option types below the currently selected level
      Object.values(newOptionTypes).forEach((newOptionType) => {
        if (newOptionType.position > optionType.position) {
          newOptionType.activeOptionValueIds = [];
          newOptionType.selectedOptionValue = '';
        }
      });

      // Obtain all valid option value id's from available product variants
      availableProductVariants.forEach((availableProductVariant) => {
        Object.keys(availableProductVariant.option_types).forEach((availableOptionTypeId) => {
          newOptionTypes[availableOptionTypeId].activeOptionValueIds.push(
            availableProductVariant.option_types[availableOptionTypeId].option_value.id
          );
        });
      });

      // Disable any option types that are more than one level below the currently selected level
      Object.values(newOptionTypes).forEach((newOptionType) => {
        if (newOptionType.position > optionType.position + 1) {
          newOptionType.activeOptionValueIds = [];
        }
      });

      return newOptionTypes;
    });
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* <ProductBreadcrumbs categories={product.breadcrumbs} product={product} /> */}

        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <ImageGallery images={product.product_images} />

          {/* Product Information */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h1 className="mb-7 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
            <p className="text-3xl text-gray-900">{product.price}</p>

            {/* Options */}
            <div className="mt-10">
              {Object.values(optionTypes).map((optionType) => (
                <OptionType
                  key={optionType.id}
                  optionType={optionType}
                  handleOptionValueSelection={handleOptionValueSelection}
                />
              ))}
            </div>
            {/* /Options */}

            <form className="mt-10">
              <button
                type="submit"
                className="mt-10 mb-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to bag
              </button>
            </form>

            <Description description={product.description} />
          </div>
          {/* /Product Information */}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await ProductListingDataService.getAll();
  const products = await res.data;

  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const res = await ProductDetailDataService.getProduct(params.slug);
  const product = await res.data;

  return {
    props: {
      product,
    },
  };
}

export default ProductDetail;

ProductDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
