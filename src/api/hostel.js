import axios from 'axios'
import Swal from 'sweetalert2'

const baseUrl = 'http://localhost:3001/api' ;
export const getHostels = async (token) => {
  try {
    const res = await axios.get(`${baseUrl}/hostels`, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    return res.data
  }catch(error) {
    console.error('[Get hostels failed]:', error)
  } 
}
export const getHostelPage = async (hostelId, token) => {
  try {
    const res = await axios.get(`${baseUrl}/hostels/${hostelId}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    return res.data
  }catch(error) {
    console.error('[Get a hostel failed]:', error)
  } 
}
export const getRoomPage = async (hostelId, roomId, token) => {
  try {
    const res = await axios.get(`${baseUrl}/hostels/${hostelId}/rooms/${roomId}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    return res.data
  }catch(error) {
    console.error('[Get a Room failed]:', error)
  } 
}
export const getBookingRoom = async (hostelId, roomId, token, checkin, checkout) => {
  try {
    const res = await axios.get(`${baseUrl}/hostels/${hostelId}/rooms/${roomId}/booking`, 
    {
      params: { checkin, checkout }, //如果在前端使用 axios.get 发送 GET 请求，并且通过 params 选项传递参数，这些参数会被自动转换为 URL 查询字符串的一部分。可以通过 req.query 在后端进行访问。但是，这不是 req.query 的主要用途，而是一个额外的特性。
      headers: {
        Authorization: "Bearer " + token
      }
    });
    return res.data
  }catch(error) {
    console.error('[ getBookingRoom failed ]:', error)
  } 
}
export const postBookingRoom = async (hostelId, roomId, token, keyword, checkin, checkout, adults, kids, tenantName, email, phone) => {
  try {
    const res = await axios.post(`${baseUrl}/hostels/${hostelId}/rooms/${roomId}/booking`, 
     { keyword, checkin, checkout, adults, kids, tenantName, email, phone }
    ,{
      headers: {
        Authorization: "Bearer " + token
      }
    });
    return res.data
  }catch(error) {
    console.error('[ postBookingRoom failed ]:', error)
  } 
}

export const searchRooms = async (keyword, checkin, checkout, adults, kids, token) => {
  try {
    const res = await axios.get(`${baseUrl}/hostels/search?keyword=${keyword}&checkin=${checkin}&checkout=${checkout}&adults=${adults}&kids=${kids}`, 
    {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    return res.data
  }catch(error) {
    console.error('[Get searchRooms failed]:', error)
    await Swal.fire({
          title: "搜尋失敗",
          text: error.response.data.message,
          timer: 3500,
          icon: "warning",
          showConfirmButton: false,
        });
    window.location.reload();
  } 
};