import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

export const lambdaHandler = async (event, context) => {
  try {
    const user_sub = event.request.userAttributes.sub;
    const email = event.request.userAttributes.email;

    await client.connect();

    const query = 'INSERT INTO users (sub, email) VALUES ($1, $2)';
    await client.query(query, [user_sub, email]);

    return event;
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to insert user data' }),
    };
  } finally {
    await client.end();
  }
};
