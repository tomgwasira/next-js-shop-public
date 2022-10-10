import * as React from 'react';

import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';

import { Category } from './NavbarInterfaces';

interface MobileNavbarProps {
  categories: Category[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function MobileNavbar({ categories, open, setOpen }: MobileNavbarProps) {
  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity ease-linear duration-50"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-50"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={React.Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
            <div className="px-4 pt-5 pb-2 flex">
              <button
                type="button"
                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Links */}
            <Tab.Group as="div" className="mt-2">
              <div className="border-b border-gray-200">
                <Tab.List className="-mb-px flex px-4 space-x-8">
                  {categories &&
                    categories.length &&
                    categories.map((level_1_category) => (
                      <Tab
                        key={level_1_category.data.name}
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? 'text-indigo-600 border-indigo-600'
                              : 'text-gray-900 border-transparent',
                            'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                          )
                        }
                      >
                        {level_1_category.data.name}
                      </Tab>
                    ))}
                </Tab.List>
              </div>
              <Tab.Panels as={React.Fragment}>
                {categories &&
                  categories.length &&
                  categories.map((level_1_category) => (
                    <Tab.Panel
                      key={level_1_category.data.name}
                      className="pt-10 pb-8 px-4 space-y-10"
                    >
                      {level_1_category.children &&
                        level_1_category.children.length &&
                        level_1_category.children.map((level_2_category) => (
                          <div key={level_2_category.data.name}>
                            <p
                              id={`${level_1_category.id}-${level_2_category.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {level_2_category.data.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${level_1_category.id}-${level_2_category.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {level_2_category.children &&
                                level_2_category.children.length &&
                                level_2_category.children.map((level_3_category) => (
                                  <li key={level_3_category.data.name} className="flow-root">
                                    <a
                                      href={level_3_category.data.href}
                                      className="-m-2 p-2 block text-gray-500"
                                    >
                                      {level_3_category.data.name}
                                    </a>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        ))}
                    </Tab.Panel>
                  ))}
              </Tab.Panels>
            </Tab.Group>

            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
              <div className="flow-root">
                <Link href="/login">
                  <a className="-m-2 p-2 block font-medium text-gray-900">Log in</a>
                </Link>
              </div>
              <div className="flow-root">
                <Link href="/signup">
                  <a className="-m-2 p-2 block font-medium text-gray-900">Create account</a>
                </Link>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
