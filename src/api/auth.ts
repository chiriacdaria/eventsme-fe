export const login = async (email: string, password: string) => {

  try {
		console.log('EMAIL: ', email, 'PASS: ', password,'fetch from:',`http://localhost:3000/auth/login`)
    const response = await fetch(
    `  http://localhost:3000/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      },
    );
		console.log(response)
    if (!response.ok) {
      throw new Error(`Login failed with status ${response.status}.`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while logging in.');
  }
};


export const register = async (
  email: string,
  password: string,
) => {

	console.log('frontend method', email,password,)
  try {
		console.log(`http://localhost:3000/auth/register`)
    const response = await fetch(
      `http://localhost:3000/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Registration failed with status ${response.status}.`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while registering.');
  }
};