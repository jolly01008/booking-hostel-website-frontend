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
}