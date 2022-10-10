import * as React from 'react';

import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline';

import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import NavbarDataService from './NavbarDataService';
import { Category } from './NavbarInterfaces';

interface NavbarProps {
  categories: Category[];
}

function Navbar(props: NavbarProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="bg-white">
      <MobileNavbar categories={props.categories} open={open} setOpen={setOpen} />
      <DesktopNavbar categories={props.categories} setOpen={setOpen} />
    </div>
  );
}

export async function getStaticProps() {
  const res = await NavbarDataService.getAllCategories();
  const categories = await res.data;

  return {
    props: {
      categories,
    },
  };
}

export default Navbar;
