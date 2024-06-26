import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'http://localhost:3001/api'
//申請房東
export const postApplyLandlord = async (id, token, name, introduction, phone, country, avatar) => {
  // 建立一個 FormData 物件。用於傳遞表單數據的 JavaScript 物件。
  const formData = new FormData()
  formData.append('name', name);  // append是將資料放入 FormData 物件中
  formData.append('introduction', introduction);
  formData.append('phone', phone);
  formData.append('country', country);
  formData.append('avatar', avatar);
  try {
    const response = await axios.post(`${baseURL}/users/${id}/applyLandlord`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const { data } = response;
    return data;

  } catch (error) {
    console.log("postApplyLandlord  is Fail", error);
    throw error;
  }
};

export const getEditUser = async (token, id) => {
try {
    const response = await axios.get(`${baseURL}/users/${id}/editUser`,
  {
    headers: {
      Authorization: " Bearer " + token,
    }
  });
  const { data } = response
  return data;
  
  } catch ( error ){
    console.error('getEditUser is Fail', error)
  }
}

export const editUser = async (token, id, email, name, phone, introduction, country, avatar) => {
  try {
    const formData = new FormData()
    formData.append('email', email);  // append是將資料放入 FormData 物件中
    formData.append('name', name);  // append是將資料放入 FormData 物件中
    formData.append('introduction', introduction);
    formData.append('phone', phone);
    formData.append('country', country);
    formData.append('avatar', avatar);
    
    const response = await axios.put(`${baseURL}/users/${id}/editUser`,
      formData,
        {
          headers: {
            Authorization: " Bearer " + token,
          }
        });
    const { data } = response
    return data;

    } catch ( error ){
      Swal.fire({
          text: error.response.data.message,
          icon: "error",
          timer: 1800,
          showConfirmButton: false,
        });
      console.error('editUser is Fail', error)
    }
}