import axios from 'axios';

const atuhURL = 'http://localhost:3001/api'

export const login = async ({ email, password }) => {
  try {
    const { data } = await axios.post(`${atuhURL}/users/signIn`, { 
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