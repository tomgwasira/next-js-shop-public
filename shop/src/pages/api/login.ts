import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import { accessMaxAge, refreshMaxAge } from '../../common/constants';
import HttpCodes from '../../common/HttpCodes';
import AuthDataService from '../../features/auth/data';

/**
 * Forward NextApi POST request with customer login data to Django Api and if authentication is
 * successful, store received authentication tokens in httpOnly cookie.
 */
export default async function loginHandler(
  nextApiReq: NextApiRequest,
  nextApiRes: NextApiResponse
) {
  if (nextApiReq.method === 'POST') {
    try {
      const djangoShopApiRes = await AuthDataService.djangoShopApiSubmitLoginForm(nextApiReq.body);
      const data = await djangoShopApiRes.data;
      // Store recieved access and refresh tokens in httpOnly cookie
      if (djangoShopApiRes.status === HttpCodes.ok) {
        nextApiRes.setHeader('Set-Cookie', [
          cookie.serialize('access', data.access, {
            httpOnly: true,
            secure: false,
            maxAge: accessMaxAge,
            sameSite: 'strict',
            path: '/api/',
          }),
          cookie.serialize('refresh', data.refresh, {
            httpOnly: true,
            secure: false,
            maxAge: refreshMaxAge,
            sameSite: 'strict',
            path: '/api/',
          }),
        ]);
        return nextApiRes.status(200).json({ success: 'Authentication successful.' });
      }
      return nextApiRes.status(500).json({
        error: 'Something went wrong when logging in.',
      });
    } catch (error: any) {
      if (error.response) {
        return nextApiRes.status(error.response.status).json(error.response.data);
      }
      return nextApiRes.status(500).json({
        error: 'Something went wrong when logging in.',
      });
    }
  } else {
    nextApiRes.setHeader('Allow', ['POST']);
    return nextApiRes.status(405).json({ error: `Method ${nextApiReq.method} not allowed.` });
  }
}
