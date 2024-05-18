import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'http://localhost:3001/api'

//建立旅館
export const postHostel = async (landlordId, token, name, address, description, picture) => {
  // 建立一個 FormData 物件。用於傳遞表單數據的 JavaScript 物件。
  const formData = new FormData()
  formData.append('name', name);  // append是將資料放入 FormData 物件中
  formData.append('address', address);
  formData.append('description', description);
  formData.append('picture', picture);
  try {
    const response = await axios.post(`${baseURL}/landlords/${landlordId}/hostels/create`,
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
    console.log("postHostel  is Fail", error);
    throw error;
  }
};
// 瀏覽房東所有旅館
export const getLandlordHostels = async (landlordId, token) => {
  try {
    const response = await axios.get(`${baseURL}/landlords/${landlordId}/hostels`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const { data } = response;
    return data;

  } catch (error) {
    Swal.fire({
        title: error.response.data.message,
        icon: "error",
        timer: 1800,
        showConfirmButton: false,
      });
    console.log("getLandlordHostels  is Fail", error);
    throw error;
  }
};

//建立房間
export const postRoom = async (landlordId, hostelId, token, title, type, headcount, price, facilities ,description, pictures) => {
  // 建立一個 FormData 物件。用於傳遞表單數據的 JavaScript 物件。
  const formData = new FormData()
  formData.append('title', title);  // append是將資料放入 FormData 物件中
  formData.append('type', type);
  formData.append('price', price);
  formData.append('headcount', headcount);
  formData.append('facilities', facilities);
  formData.append('description', description);

  // 將每個圖片都添加到 FormData 物件中
  pictures.forEach((picture) => {
    formData.append('pictures', picture); // 同時也對應到後端陣列的命名，pictures
  });

  try {
    const response = await axios.post(`${baseURL}/landlords/${landlordId}/hostels/${hostelId}/createRoom`,
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
    console.log("postRoom  is Fail", error);
    throw error;
  }
};

// 瀏覽房東單一旅館
export const getLandlordHostel = async (landlordId, hostelId, token) => {
  try {
    const response = await axios.get(`${baseURL}/landlords/${landlordId}/hostels/${hostelId}/rooms`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const { data } = response;
    return data;

  } catch (error) {
    Swal.fire({
        text: error.response.data.message,
        icon: "warning",
        timer: 1800,
        showConfirmButton: false,
      });
    console.log("getLandlordHostels  is Fail", error);
    throw error;
  }
};
// 瀏覽房東單一要編輯的旅館
export const getEditHostel = async (landlordId, hostelId, token) => {
  try {
    const response = await axios.get(`${baseURL}/landlords/${landlordId}/hostels/${hostelId}/edit`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const { data } = response;
    return data;

  } catch (error) {
    Swal.fire({
        text: error.response.data.message,
        icon: "warning",
        timer: 1800,
        showConfirmButton: false,
      });
    console.log("getEditHostel  is Fail", error);
    throw error;
  }
};
// 房東編輯單一個旅館
export const editHostel = async (landlordId, hostelId, token, name, address, description, newPicture) => {
  try {
     const formData = new FormData()
      formData.append('name', name);  // append是將資料放入 FormData 物件中
      formData.append('address', address);
      formData.append('description', description);
      formData.append('picture', newPicture || '[]');

    const response = await axios.put(`${baseURL}/landlords/${landlordId}/hostels/${hostelId}/edit`,
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
    Swal.fire({
        text: error.response.data.message,
        icon: "warning",
        timer: 1800,
        showConfirmButton: false,
      });
    console.log("editHostel is Fail", error);
    throw error;
  }
};

// 瀏覽房東單一房間
export const getLandlordRoom = async (landlordId, hostelId, roomId, token) => {
  try {
    const response = await axios.get(`${baseURL}/landlords/${landlordId}/hostels/${hostelId}/rooms/${roomId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const { data } = response;
    return data;

  } catch (error) {
    Swal.fire({
        text: error.response.data.message,
        icon: "warning",
        timer: 1800,
        showConfirmButton: false,
      });
    console.log("getLandlordRoom  is Fail", error);
    throw error;
  }
};
// 瀏覽房東要編輯的單一房間
export const getEditLandlordRoom = async (landlordId, hostelId, roomId, token) => {
  try {
    const response = await axios.get(`${baseURL}/landlords/${landlordId}/hostels/${hostelId}/rooms/${roomId}/edit`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const { data } = response;
    return data;

  } catch (error) {
    Swal.fire({
        text: error.response.data.message,
        icon: "warning",
        timer: 1800,
        showConfirmButton: false,
      });
    console.log("getEditLandlordRoom is Fail", error);
    throw error;
  }
};
// 房東編輯單一房間
export const editLandlordRoom = async (landlordId, hostelId, roomId, token, title, type, headcount, price, facilities, newfacilities ,description, newPictures) => {
  try {
     const formData = new FormData()
      formData.append('title', title);  // append是將資料放入 FormData 物件中
      formData.append('type', type);
      formData.append('price', price);
      formData.append('headcount', headcount);
      formData.append('facilities', newfacilities || facilities);
      formData.append('description', description);

      // 如果有新圖片則append新圖片，若無新圖片則給一個'[]' (至於為甚麼是'[]'與後端程式碼的撰寫有關)
      if (newPictures) {
           newPictures.forEach((newPicture) => {
           formData.append('pictures', newPicture); 
            });
        } else {
          formData.append('pictures', '[]');
        }
    const response = await axios.put(`${baseURL}/landlords/${landlordId}/hostels/${hostelId}/rooms/${roomId}/edit`,
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
    Swal.fire({
        text: error.response.data.message,
        icon: "warning",
        timer: 1800,
        showConfirmButton: false,
      });
    console.log("editLandlordRoom is Fail", error);
    throw error;
  }
};
// 房東刪除單一房間
export const deleteLandlordRoom = async (landlordId, hostelId, roomId, token) => {
  try {
    const response = await axios.delete(`${baseURL}/landlords/${landlordId}/hostels/${hostelId}/rooms/${roomId}/delete`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const { data } = response;
    return data;

  } catch (error) {
    Swal.fire({
        text: error.response.data.message,
        icon: "warning",
        timer: 1800,
        showConfirmButton: false,
      });
    console.log("deleteLandlordRoom is Fail", error);
    throw error;
  }
};

export const getEditLandlord = async (token, landlordId) => {
try {
    const response = await axios.get(`${baseURL}/landlords/${landlordId}/editLandlord`,
  {
    headers: {
      Authorization: " Bearer " + token,
    }
  });
  const { data } = response
  return data;
  
  } catch ( error ){
    console.error('getEditLandlord is Fail', error)
  }
};

export const editLandlord = async (token, landlordId, name, phone, introduction, country, avatar) => {
  try {
    const formData = new FormData()
    formData.append('name', name);  // append是將資料放入 FormData 物件中
    formData.append('introduction', introduction);
    formData.append('phone', phone);
    formData.append('country', country);
    formData.append('avatar', avatar);
    
    const response = await axios.put(`${baseURL}/landlords/${landlordId}/editLandlord`,
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
      console.error('editLandlord is Fail', error)
    }
  }