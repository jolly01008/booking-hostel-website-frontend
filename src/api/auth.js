import axios from 'axios';

const authURL = 'http://localhost:3001/api'

export const login = async ({ email, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/users/signIn`, { 
    email, 
    password })

  const { token } = data;

  if ( token ) {
    return { success:true, ...data }
  }

  return data; //如果沒有token，就回傳data

  } catch (error) {
    console.error('[Siginin Failed]:', error)
    return { success: false }
  }
};

export const checkPermission = async (token) => {
  try {
    const response = await axios.get(`${authURL}/hostels`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data.success;
  } catch (error) {
    console.error('[Check Permission Failed]:', error);
  }
};