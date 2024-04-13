import axios from 'axios'

const baseURL = 'http://localhost:3001/api'

export const getUser = async (token, id) => {
try {
    const response = await axios.get(`${baseURL}/users/${id}`,
  {
    headers: {
      Authorization: " Bearer " + token,
    }
  });

  const data = response.data
  
  return data;
  } catch ( error ){
    console.error('getUser is Fail', error)
  }
  

}