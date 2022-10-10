import * as React from 'react';

import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';

import AuthContext from '../../common/contexts/AuthContext';
import HttpCodes from '../../common/HttpCodes';
import LogoutDataService from '../logout/data';
import { Category } from './NavbarInterfaces';

interface DesktopNavbarProps {
  categories: Category[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function DesktopNavbar({ categories, setOpen }: DesktopNavbarProps) {
  const authContext = React.useContext(AuthContext);

  /**
   * Make NextApi GET request for logout. Implemented it here because requires access to context
   * which can only be done in a component.
   */
  async function logout(e: React.MouseEvent<any>) {
    e.preventDefault();

    try {
      // Send logout request to NextApi
      const nextApiRes = await LogoutDataService.nextApiLogout();
      if (nextApiRes.status === HttpCodes.ok) {
        authContext?.logout();
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  }

  return (
    <header className="relative bg-white">
      <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <div className="h-16 flex items-center">
            <button
              type="button"
              className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Flyout menus */}
            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="h-full flex space-x-8">
                {categories &&
                  categories.length &&
                  categories.map((level_1_category: Category) => (
                    <Popover key={level_1_category.data.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                              )}
                            >
                              {level_1_category.data.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={React.Fragment}
                            enter="transition ease-out duration-50"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-50"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="max-w-7xl mx-auto px-8">
                                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                    <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                      {level_1_category.children &&
                                        level_1_category.children.length &&
                                        level_1_category.children.map((level_2_category) => (
                                          <div key={level_2_category.data.name}>
                                            <p
                                              id={`${level_2_category.data.name}-heading`}
                                              className="font-medium text-gray-900"
                                            >
                                              {level_2_category.data.name}
                                            </p>
                                            <ul
                                              role="list"
                                              aria-labelledby={`${level_2_category.data.name}-heading`}
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {level_2_category.children &&
                                                level_2_category.children.length &&
                                                level_2_category.children.map(
                                                  (level_3_category) => (
                                                    <li
                                                      key={level_3_category.data.name}
                                                      className="flex"
                                                    >
                                                      <a
                                                        href={level_3_category.data.href}
                                                        className="hover:text-gray-800"
                                                      >
                                                        {level_3_category.data.name}
                                                      </a>
                                                    </li>
                                                  )
                                                )}
                                            </ul>
                                          </div>
                                        ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
              </div>
            </Popover.Group>

            <div className="ml-auto flex items-center">
              {!authContext.authDetails.isAuthenticated && (
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link href="/login">
                    <a className="text-sm font-medium text-gray-700 hover:text-gray-800">Log in</a>
                  </Link>

                  <Link href="/signup">
                    <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Create account
                    </a>
                  </Link>
                </div>
              )}

              {authContext.authDetails.isAuthenticated && (
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <button onClick={logout}>
                    <a className="text-sm font-medium text-gray-700 hover:text-gray-800">Log out</a>
                  </button>

                  {/* TODO: Assumes firstName is always defined. */}
                  <span>Hi {authContext.authDetails.user.firstName}</span>

                  {/* <Link href="#">
                    <a className="text-sm font-medium text-gray-700 hover:text-gray-800">Account</a>
                  </Link> */}
                </div>
              )}

              {/* Search */}
              <div className="flex lg:ml-6">
                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <SearchIcon className="w-6 h-6" aria-hidden="true" />
                </a>
              </div>
              {/* /Search */}

              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-6">
                <a href="#" className="group -m-2 p-2 flex items-center">
                  <ShoppingBagIcon
                    className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    0
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </a>
              </div>
              {/* /Cart */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
