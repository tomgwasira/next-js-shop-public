import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import HttpCodes from '../../../common/HttpCodes';
import AuthDataService from '../../../features/auth/data';

/**
 * Get basic (non-sensitive) user information about authenticated user from Django Shop API.
 */
export default async function authUserHandler(
  nextApiReq: NextApiRequest,
  nextApiRes: NextApiResponse
) {
  if (nextApiReq.method === 'GET') {
    const cookies = cookie.parse(nextApiReq.headers.cookie ?? ''); // empty object if no cookies i.e. '' parsed
    const access = cookies.access ?? false; // undefined if access doesn't exist in cookies

    // If no access token return unauthorized error response
    if (!access) {
      return nextApiRes
        .status(HttpCodes.unauthorized)
        .json({ error: 'User unauthorized to make this request.' });
    }

    // Request authorized user data from Django Shop API
    try {
      const djangoShopApiRes = await AuthDataService.djangoShopApiGetAuthUser(access);
      const data = await djangoShopApiRes.data;

      if (djangoShopApiRes.status === HttpCodes.ok) {
        return nextApiRes.status(djangoShopApiRes.status).json(djangoShopApiRes.data);
      }
      return nextApiRes.status(djangoShopApiRes.status).json(djangoShopApiRes.data);
    } catch (error) {
      if (error.response) {
        return nextApiRes.status(error.response.status).json(error.response.data);
      }
      return nextApiRes.status(HttpCodes.internal_server_error).json({
        error: 'Something went wrong while fetching user information.',
      });
    }
  } else {
    nextApiRes.setHeader('Allow', ['GET']);
    return nextApiRes
      .status(HttpCodes.method_not_allowed)
      .json({ error: `Method ${nextApiReq.method} not allowed.` });
  }
}
