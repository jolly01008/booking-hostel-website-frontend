import axios from 'axios'

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