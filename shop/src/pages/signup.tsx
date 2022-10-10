import * as React from 'react';

import Link from 'next/link';

import MainLayout from '../common/layouts/MainLayout';
import SignupDataService from '../features/signup/data';

function Signup() {
  const [formData, setFormData] = React.useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirmation: '',
  });

  const { email, firstName, lastName, password, passwordConfirmation } = formData;

  /**
   * Change value of form field to user input.
   */
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  /**
   * Submit signup form.
   */
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      // Turn data into type that API is expecting and submit form
      const nextApiRes = await SignupDataService.nextApiSubmitSignupForm({
        email,
        password,
        password_confirmation: passwordConfirmation,
        customer_profile: {
          first_name: firstName,
          last_name: lastName,
        },
      });
      const data = await nextApiRes.data;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  }

  return (
    <div className="flex  justify-center py-9 bg-gray-100">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        <h3 className="text-2xl font-bold text-center">Sign Up</h3>
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
            <label className="block" htmlFor="first-name">
              First Name*
            </label>
            <input
              id="first-name"
              name="firstName"
              type="text"
              placeholder="First Name"
              onChange={onChange}
              value={firstName}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block" htmlFor="last-name">
              Last Name*
            </label>
            <input
              id="last-name"
              name="lastName"
              type="text"
              placeholder="Last Name"
              onChange={onChange}
              value={lastName}
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

          <div className="mt-4">
            <label className="block" htmlFor="password-confirmation">
              Confirm Password*
            </label>
            <input
              id="password-confirmation"
              name="passwordConfirmation"
              type="text"
              placeholder="Confirm Password"
              onChange={onChange}
              value={passwordConfirmation}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
            <span className="text-xs text-red-400">Password must be the same!</span>
          </div>

          <div className="mt-4 flex">
            <button className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
              Create Account
            </button>
          </div>

          <div className="mt-6 text-grey-dark">
            Already have an account? &nbsp;
            <Link href="/login">
              <a className="text-blue-600 hover:underline">Log in</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

Signup.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
