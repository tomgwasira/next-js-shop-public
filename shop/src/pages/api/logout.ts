import * as React from 'react';

import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import AuthContext from '../../common/contexts/AuthContext';
import HttpCodes from '../../common/HttpCodes';
import SignupDataService from '../../features/signup/data';

/**
 * Logout user both on database and by clearing access and refresh tokens in httpOnly cookie.
 *
 * @param {NextApiRequest} nextApiReq - NextApi GET request for user logout.
 * @param {NextApiResponse} nextApiRes - NextApi response for user logout.
 * @returns {NextApiResponse} NextApi response for user logout.
 */
export default async function logoutHandler(
  nextApiReq: NextApiRequest,
  nextApiRes: NextApiResponse
) {
  if (nextApiReq.method === 'GET') {
    // Remove tokens from httpOnlyCookie
    try {
      nextApiRes.setHeader('Set-Cookie', [
        cookie.serialize('access', '', {
          httpOnly: true,
          secure: false,
          expires: new Date(0),
          sameSite: 'strict',
          path: '/api/',
        }),
        cookie.serialize('refresh', '', {
          httpOnly: true,
          secure: false,
          expires: new Date(0),
          sameSite: 'strict',
          path: '/api/',
        }),
      ]);
      // const djangoShopApiRes = await SignupDataService.djangoShopApiSubmitSignupForm(nextApiReq.body);
      // const data = await djangoShopApiRes.data;
      // return nextApiRes.status(djangoShopApiRes.status).json(data);
      return nextApiRes.status(HttpCodes.ok).json({
        success: 'Logout successful.',
      });
    } catch (error: any) {
      if (error.response) {
        return nextApiRes.status(error.response.status).json(error.response.data);
      }
      return nextApiRes.status(HttpCodes.internal_server_error).json({
        error: 'Something went wrong when logging out user.',
      });
    }
  } else {
    nextApiRes.setHeader('Allow', ['GET']);
    return nextApiRes
      .status(HttpCodes.method_not_allowed)
      .json({ error: `Method ${nextApiReq.method} not allowed.` });
  }
}
