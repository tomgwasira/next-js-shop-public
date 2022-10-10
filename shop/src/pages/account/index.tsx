import * as React from 'react';

import AuthContext from '../../common/contexts/AuthContext';
import HttpCodes from '../../common/HttpCodes';
import MainLayout from '../../common/layouts/MainLayout';
import AccountDataService from '../../features/account/data';

function Account() {
  const authContext = React.useContext(AuthContext);

  // console.log('********************');
  // const x = JSON.parse(window.localStorage.getItem('authDetails') || '{}');

  // console.log(x);

  // console.log('********************');

  // React.useEffect(() => {
  //   try {
  //     const nextApiRes = await AccountDataService.nextApiGetUser();
  //     const data = await nextApiRes.data;
  //     if (nextApiRes.status === HttpCodes.ok) {
  //       console.log(data);
  //     }
  //   } catch (error: any) {
  //     if (error.response) {
  //       console.log(error.response.data);
  //     }
  //   }
  // }, []);

  return <div>Hello</div>;
}

export default Account;

Account.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
