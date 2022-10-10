import * as React from 'react';

import { RadioGroup } from '@headlessui/react';

import classNames from '../../common/tailwind/ClassNames';

interface OptionTypeProps {
  optionType: any;
  handleOptionValueSelection: any;
}

export default function OptionType({ optionType, handleOptionValueSelection }: OptionTypeProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray-900 font-medium">
          {optionType.displayName ? optionType.displayName : optionType.name}
        </h3>
      </div>
      <RadioGroup
        value={optionType.selectedOptionValue}
        onChange={(optionValueId) => {
          handleOptionValueSelection(optionType, optionValueId);
        }}
        className="mt-4"
      >
        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
          {optionType.optionValues.map((optionValue: any) => {
            return (
              <RadioGroup.Option
                key={optionValue.id}
                value={optionValue.id}
                disabled={!optionType.activeOptionValueIds.includes(optionValue.id)}
                className={({ disabled, checked }) =>
                  classNames(
                    disabled
                      ? 'bg-gray-50 text-gray-200 cursor-not-allowed'
                      : 'bg-white shadow-sm text-gray-900 cursor-pointer',
                    checked ? 'ring-2 ring-indigo-500' : '',
                    'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                  )
                }
              >
                <RadioGroup.Label as="p"> {optionValue.name}</RadioGroup.Label>
              </RadioGroup.Option>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
}
