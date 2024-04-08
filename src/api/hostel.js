import axios from 'axios'

const baseUrl = 'http://localhost:3001' ;
export const getHostels = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/hostels`);
    console.log(res.data)
    return res.data
  }catch(error) {
    console.error('[Get hostels failed]:', error)
  } 
}