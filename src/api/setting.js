import axios from 'axios'

import Swal from 'sweetalert2'

const baseURL = 'http://localhost:3001/api'

export const getUserInfo = async (token, id) => {
try {
    const response = await axios.get(`${baseURL}/users/${id}`,
  {
    headers: {
      Authorization: " Bearer " + token,
    }
  });
  console.log('setting的response', response)
  const data = response.data
  
  return data;
  } catch ( error ){
     Swal.fire({
        title: '沒有權限',
        text: error.response.data.message,
        icon: "error",
        timer: 1800,
        showConfirmButton: false,
      });
    console.error('getUser is Fail', error)
  }
  

}