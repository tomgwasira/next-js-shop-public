import * as React from 'react';

import Link from 'next/link';

import AuthContext from '../common/contexts/AuthContext';
import HttpCodes from '../common/HttpCodes';
import MainLayout from '../common/layouts/MainLayout';
import AuthDataService from '../features/auth/data';

function Login() {
  const authContext = React.useContext(AuthContext);

  const [loginFormData, setLoginFormData] = React.useState({
    email: '',
    password: '',
  });

  const { email, password } = loginFormData;

  /**
   * Change value of login form field to user input.
   */
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  }

  /**
   * Submit login form.
   */
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Submit login form to Django Shop API via Next API
    try {
      const nextApiRes = await AuthDataService.nextApiSubmitLoginForm({
        email,
        password,
      });
      const data = await nextApiRes.data;
      if (nextApiRes.status === HttpCodes.ok) {
        // If successfully authenticated, obtain basic user information
        try {
          const nextApiAuthUserRes = await AuthDataService.nextApiGetAuthUser();
          const data = await nextApiAuthUserRes.data;
          if (nextApiAuthUserRes.status === HttpCodes.ok) {
            // Login routine with fetched user data
            authContext?.login({
              firstName: data.customer_profile.first_name ?? '',
              lastName: data.customer_profile.last_name ?? '',
            });
          } else {
            alert('Something unexpected occured while trying to fetch user information.');
          }
        } catch (error) {
          if (error.response) {
            alert(error.response);
          } else {
            alert('Something went wrong while fetching user information');
          }
        }
      } else {
        alert('Something unexpected occured while trying to log in.');
      }
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data);
      } else {
        alert('Something went wrong while logging in.');
      }
    }
  }

  return (
    <div className="flex  justify-center py-9 bg-gray-100">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        <h3 className="text-2xl font-bold text-center">Login</h3>
        <form onSubmit={onSubmit}>
          <div className="mt-4">
            <label className="block" htmlFor="email">
              Email*
            </label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={onChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block" htmlFor="password">
              Password*
            </label>
            <input
              id="password"
              name="password"
              type="text"
              placeholder="Password"
              onChange={onChange}
              value={password}
              minLength={8}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>

          <div className="mt-4 flex">
            <button className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
              Log in
            </button>
          </div>

          <div className="mt-6 text-grey-dark">
            Don't have an account? &nbsp;
            <Link href="/signup">
              <a className="text-blue-600 hover:underline">Create account</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

Login.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
