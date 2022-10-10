import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import HttpCodes from '../../common/HttpCodes';
import AccountDataService from '../../features/account/data';

/**
 * Get authorised user data from Django API.
 */
export default async function accountHandler(
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

    // Request authorized user data from Django API
    try {
      const djangoShopApiRes = await AccountDataService.djangoShopApiGetUser(access);
      const data = await djangoShopApiRes.data;

      // Successfully retrieved user
      if (djangoShopApiRes.status === HttpCodes.ok) {
        return nextApiRes.status(djangoShopApiRes.status).json(djangoShopApiRes.data);
      }

      // Got unexpected success status
      return nextApiRes.status(djangoShopApiRes.status).json(djangoShopApiRes.data);
    } catch (error) {
      // Got error response
      if (error.response) {
        return nextApiRes.status(error.response.status).json(error.response.data);
      }
      // Did not get error response
      return nextApiRes.status(HttpCodes.internal_server_error).json({
        error: 'Something went wrong when retrieving user.',
      });
    }
  } else {
    nextApiRes.setHeader('Allow', ['GET']);
    return nextApiRes
      .status(HttpCodes.method_not_allowed)
      .json({ error: `Method ${nextApiReq.method} not allowed.` });
  }
}
