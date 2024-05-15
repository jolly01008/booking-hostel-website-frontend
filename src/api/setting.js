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
  const data = response.data
  
  return data;
  } catch ( error ){
     Swal.fire({
        title: '提醒',
        text: error.response.data.message,
        icon: "warning",
        timer: 2300,
        showConfirmButton: false,
      });
    console.error('getUser is Fail', error)
  }
}
export const getLandlordInfo = async (token, landlordId) => {
try {
    const response = await axios.get(`${baseURL}/landlords/${landlordId}`,
  {
    headers: {
      Authorization: " Bearer " + token,
    }
  });

  const data = response.data
  return data;
  } catch ( error ){
     Swal.fire({
        title: '提醒',
        text: error.response.data.message,
        icon: "warning",
        timer: 2300,
        showConfirmButton: false,
      });
    console.error('getLandlordInfo is Fail', error)
  }
}

export const switchRole = async (token) => {
try {
    const response = await axios.patch(`${baseURL}/switchRole`, null,
  {
    headers: {
      Authorization: " Bearer " + token,
    }
  });
  const data = response.data // 這支api從後端取得的一整包data，包含status、data(用戶id)、switchedToken、message
  
  return data;
  } catch ( error ){
     Swal.fire({
        title: '發生了一些錯誤',
        text: error.response.data.message,
        icon: "error",
        timer: 1800,
        showConfirmButton: false,
      });
    console.error('switchRole is Fail', error)
  }
}