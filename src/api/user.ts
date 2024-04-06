import { StorageKey } from '../types/store.type';
import { UserType } from '../types/user.type';

interface UpdateUserOptions {
  fieldsToUpdate: Partial<UserType>; 
}

export async function updateUser(
  user: Partial<UserType>,
  options: UpdateUserOptions
): Promise<UserType> {
  try {
    const accessToken = localStorage.getItem(StorageKey.EventsMe);

    if (!user || Object.keys(user).length === 0) {
      throw new Error('Please provide a valid user.');
    }

    const { fieldsToUpdate } = options;
	console.log('fields:', fieldsToUpdate)
    const requestBody: Partial<UserType> = {}; 

		if (fieldsToUpdate.email) {
      requestBody.email = fieldsToUpdate.email;
    }
    if (fieldsToUpdate.fullName) {
      requestBody.fullName = fieldsToUpdate.fullName;
    }
    if (fieldsToUpdate.password && fieldsToUpdate.password.trim() !== '') {
      requestBody.password = fieldsToUpdate.password;
    }
    if (fieldsToUpdate.deletedAt) {
      requestBody.deletedAt = fieldsToUpdate.deletedAt;
    }

		console.log(accessToken, requestBody)
    const response = await fetch(
      `http://localhost:3000/users/${user.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody), 
      }
    );

    console.log('response', response);

    if (!response.ok) {
      throw new Error(`Failed to update user ${user.email}.`);
    }

    return (await response.json()) as UserType;
  } catch (error) {
    console.error(error);
    throw new Error(`An error occurred while updating user ${user.email}.`);
  }
}
