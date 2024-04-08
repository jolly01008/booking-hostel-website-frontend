import axios from 'axios'

const baseUrl = 'http://localhost:3001/api' ;
export const getHostels = async () => {
  try {
    const res = await axios.get(`${baseUrl}/hostels`);
    return res.data
  }catch(error) {
    console.error('[Get hostels failed]:', error)
  } 
}