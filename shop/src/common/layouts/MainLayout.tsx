import * as React from 'react';

import useSWR from 'swr';

import Navbar from '../../features/navbar/Navbar';
import NavbarDataService from '../../features/navbar/NavbarDataService';

const fetcher = (url: string) => NavbarDataService.getAllCategories().then((res) => res.data);

export default function MainLayout({ children }: any) {
  // Don't actually need the URL as NavbarDataService is being used
  const { data, error } = useSWR('/categories', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Navbar categories={data} />
      <main>{children}</main>
    </>
  );
}
