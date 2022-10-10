import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import { accessMaxAge, refreshMaxAge } from '../../../common/constants';
import HttpCodes from '../../../common/HttpCodes';
import AuthDataService from '../../../features/auth/data';

/**
 * Verify if access token in httpOnly cookie is still valid.
 */
export default async function verifyHandler(
  nextApiReq: NextApiRequest,
  nextApiRes: NextApiResponse
) {
  if (nextApiReq.method === 'GET') {
    const cookies = cookie.parse(nextApiReq.headers.cookie ?? '');
    const access = cookies.access ?? false;

    // If no access token return unauthorized error response
    if (!access) {
      return nextApiRes
        .status(HttpCodes.forbidden)
        .json({ error: 'User forbidden from making this request.' });
    }

    // Verify access token on Django Shop API
    try {
      const djangoShopApiRes = await AuthDataService.djangoShopApiVerifyAccessToken(
        JSON.stringify({ token: access })
      );

      if (djangoShopApiRes.status === HttpCodes.ok) {
        return nextApiRes.status(djangoShopApiRes.status).json({ success: 'Access token valid.' });
      }
      return nextApiRes.status(djangoShopApiRes.status).json({
        error: 'Something unexpected occured while trying to verify authentication token.',
      });
    } catch (error) {
      // If verify failed, try refreshing token
      const refresh = cookies.refresh ?? false;

      // If no access token return unauthorized error response
      if (!refresh) {
        return nextApiRes
          .status(HttpCodes.forbidden)
          .json({ error: 'User forbidden from making this request.' });
      }

      // Refresh token on Django Shop API
      try {
        const djangoShopApiRes = await AuthDataService.djangoShopApiRefreshTokens(
          JSON.stringify({ refresh })
        );
        const data = await djangoShopApiRes.data;

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

          return nextApiRes.status(djangoShopApiRes.status).json(djangoShopApiRes.data);
        }
        return nextApiRes.status(djangoShopApiRes.status).json(djangoShopApiRes.data);
      } catch (error) {
        if (error.response) {
          return nextApiRes.status(error.response.status).json(error.response.data);
        }
        return nextApiRes.status(HttpCodes.internal_server_error).json({
          error: 'Something went wrong while refreshing authentication tokens.',
        });
      }
    }
  } else {
    nextApiRes.setHeader('Allow', ['GET']);
    return nextApiRes
      .status(HttpCodes.method_not_allowed)
      .json({ error: `Method ${nextApiReq.method} not allowed.` });
  }
}
