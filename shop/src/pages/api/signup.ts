import { NextApiRequest, NextApiResponse } from 'next';

import SignupDataService from '../../features/signup/data';

/**
 * Forward NextApi POST request with customer signup data to Django Api and set Django Api
 * response as the NextApi response
 *
 * @param {NextApiRequest} nextApiReq - NextApi POST request for customer signup.
 * @param {NextApiResponse} nextApiRes - NextApi response for customer signup.
 * @returns {NextApiResponse} NextApi response for customer signup containing data from Django Shop
 *  Api Response.
 */
export default async function signupHandler(
  nextApiReq: NextApiRequest,
  nextApiRes: NextApiResponse
) {
  if (nextApiReq.method === 'POST') {
    try {
      const djangoShopApiRes = await SignupDataService.djangoShopApiSubmitSignupForm(
        nextApiReq.body
      );
      const data = await djangoShopApiRes.data;

      return nextApiRes.status(djangoShopApiRes.status).json(data);
    } catch (error: any) {
      if (error.response) {
        return nextApiRes.status(error.response.status).json({ error: error.response.data });
      }
      return nextApiRes.status(500).json({
        error: 'Something went wrong when signing up customer.',
      });
    }
  } else {
    nextApiRes.setHeader('Allow', ['POST']);
    return nextApiRes.status(405).json({ error: `Method ${nextApiReq.method} not allowed.` });
  }
}
