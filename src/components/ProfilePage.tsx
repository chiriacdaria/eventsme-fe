import React, { useState, useEffect } from 'react';
import {
  IconEditCircle,
  IconCircleCheck,
  IconCircleX,
} from '@tabler/icons-react';
import { StorageKey } from '../types/store.type';
import Avatar, { genConfig } from 'react-nice-avatar';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Button, Modal, Tooltip } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../api/user';
import { useDisclosure } from '@mantine/hooks';
import { format } from 'date-fns';


const ProfilePage = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
  });
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [change, setChange] = useState('');
  const [editedUserData, setEditedUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const storedUserData = JSON.parse(
      localStorage.getItem(StorageKey.User) || '{}'
    );
    setUserData(storedUserData);
    
    // Extract email before '@' to set as default value for fullName
    const email = storedUserData.email || '';
    const defaultFullName = email.split('@')[0];
    
    setEditedUserData({
      ...storedUserData,
      fullName: defaultFullName,
    });
  }, []);
  

  const handleEditDetails = () => {
    setIsEditingDetails(!isEditingDetails);
  };

  const handleDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const saveEditedDetails = async () => {
    try {
      await updateUser(userData, { fieldsToUpdate: editedUserData });

      setUserData((prevUserData) => ({
        ...prevUserData,
        ...editedUserData,
      }));

      setIsEditingDetails(false);

      localStorage.setItem(StorageKey.User, JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save edited details:', error);
    }
  };

  const config = genConfig(change);
  
  const handleDeleteAccount = async () => {
    //TODO: this is wyp
    try {
      const deletedAt = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  console.log(deletedAt)
      const updatedUserData = { ...editedUserData, deletedAt };
  
      await updateUser(userData, { fieldsToUpdate: updatedUserData });
       
      setUserData(updatedUserData);
  
      close();
  
      // Optionally, navigate to a different page after account deletion
      // navigate('/goodbye');
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };
  
  
  
  

  return (
    <>
      <div className="flex flex-col items-center justify-start w-full min-h-screen px-6 pt-8 pb-0 text-xs md:px-16 bg-zircon sm:text-base">
        <div className="flex flex-col w-full md:flex-row">
          <div className="w-full pr-0 md:pr-4">
            {/* Profile details */}
            <div className="relative p-6 mt-16 mb-6 bg-white md:mb-10 rounded-2xl">
              <div className="absolute top-0 right-0 mt-4 mr-4">
                {isEditingDetails ? (
                  <div className="flex">
                    <IconCircleCheck
                      className="w-6 h-6 mr-2 text-success-green"
                      onClick={saveEditedDetails}
                    />
                    <IconCircleX
                      className="w-6 h-6 text-error-red"
                      onClick={handleEditDetails}
                    />
                  </div>
                ) : (
                  <IconEditCircle
                    className="w-6 h-6 cursor-pointer text-slate-gray hover:text-gray-600"
                    onClick={handleEditDetails}
                  />
                )}
              </div>
              <div className="flex items-center mb-4">
              <Tooltip label="Change image on click!">

              <button onClick={() => setChange(Date.now().toString())}>
                
                  <Avatar style={{ width: '8rem', height: '8rem' }} {...config} />
              </button>
              </Tooltip>

                <div className="flex flex-col justify-between ml-6 overflow-hidden">
                  {isEditingDetails ? (
                    <>
                      <div className="grid grid-cols-1 gap-y-2">
                        <div className="flex flex-col md:flex-row md:space-x-4">
                          <div>
                            <label htmlFor="fullName" className="mb-1 font-semibold">
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              id="fullName"
                              value={editedUserData.fullName}
                              onChange={handleDetailsChange}
                              className="w-full px-3 py-2 mb-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="mb-1 font-semibold">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={editedUserData.email}
                              onChange={handleDetailsChange}
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="phoneNumber" className="block mb-1 font-semibold">
                            Phone Number
                          </label>
                          <div className="relative">
                            <PhoneInput
                              country={'ro'}
                              // value={editedUserData.phoneNumber}
                              // onChange={handleDetailsChange}
                              inputStyle={{
                                width: '100%',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.375rem',
                                outline: 'none',
                                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                              }}
                              containerStyle={{
                                width: '100%',
                              }}
                            />
                          </div>
                        </div>

                      </div>
                    </>
                  ) : (
                    <>
                      <h1 className="mb-2 text-xl font-bold md:text-3xl">
                        {userData.fullName || userData.email.split('@')[0]}
                      </h1>
                      <p className="mb-2 truncate max-w-32 md:max-w-min">
                        {userData.email}
                      </p>
                      <p className="max-w-32 md:max-w-min">
                        {userData.phoneNumber}
                      </p>
                    </>
                  )}
                </div>
              </div>
            
</div>
<div className="mt-4 ">
    <Button
      onClick={() => navigate('/eventsme/events')}
      variant="filled"
      color="#1F2937"
      radius="md"
      fullWidth
    >
See my events    
</Button>
  </div>
<div className="mt-4 ">
    <Button
onClick={open}
      variant="filled"
      color="red"
      radius="md"
      fullWidth
    >
      Delete Account
    </Button>
  </div>
  <Modal opened={opened} onClose={close} centered >
  <div className="p-4">
    <h2 className="mb-4 text-xl font-semibold">Delete Account</h2>
    <p className="mb-4 text-sm text-gray-700">Are you sure you want to delete your account?</p>
    <div className="flex justify-end">
      <Button onClick={close}        color="#1F2937"
className="mr-2">Cancel</Button>
      <Button color="red" onClick={handleDeleteAccount}>Delete</Button>
    </div>
  </div>
</Modal>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
