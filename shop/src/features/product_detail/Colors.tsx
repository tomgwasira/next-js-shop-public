import * as React from 'react';
import { useState } from 'react';

import { RadioGroup } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/solid';

import classNames from '../../common/tailwind/ClassNames';

interface ProductColor {
  name: string;
  selectedClass: any;
  class: any;
}

interface ColorsProps {
  colors: ProductColor[];
}

export default function Colors({ colors }: ColorsProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <div>
      <h3 className="text-sm text-gray-900 font-medium">Color</h3>

      <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
        <div className="flex items-center space-x-3">
          {colors.map((color) => (
            <RadioGroup.Option
              key={color.name}
              value={color}
              className={({ active, checked }) =>
                classNames(
                  color.selectedClass,
                  active && checked ? 'ring ring-offset-1' : '',
                  !active && checked ? 'ring-2' : '',
                  '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                )
              }
            >
              <RadioGroup.Label as="p" className="sr-only">
                {color.name}
              </RadioGroup.Label>
              <span
                aria-hidden="true"
                className={classNames(
                  color.class,
                  'h-8 w-8 border border-black border-opacity-10 rounded-full'
                )}
              />
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
