import axios from 'axios';

export const lambdaHandler = async (event, context) => {
  try {
    const sub = event.request.userAttributes.sub;
    const email = event.request.userAttributes.email;
    const api = process.env.API_URL;

    response = axios.post(api, { sub, email });

    return event;
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to insert user data' }),
    };
  }
};
