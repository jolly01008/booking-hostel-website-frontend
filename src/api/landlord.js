import axios from 'axios'

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

