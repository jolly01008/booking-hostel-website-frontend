// components 
import HostelCard from "../../components/HostelCard/HostelCard";
// import NavContainer from "components/NavContainer/NavContainer";
import SearchBar from "../../components/SearchBar/SearchBar";

//api
import { getHostels } from '../../api/hostel';

import { useEffect } from "react";
import { useState } from "react";

// SCSS
import styles from "./MainPage.module.scss";


export default function MainPage() {
  const [hostels, setHostels] = useState([]);
  console.log('hostels內容A:', hostels)

  // 瀏覽hostels的實際應用
  useEffect(() => {
    const getHostelsAsync = async () => {
      try {
        //後端拿到的資料存到hostels
        const hostels = await getHostels();
        console.log('hostels內容B:', hostels)
        // 改變hostels的狀態，進而重新渲染畫面
        setHostels(hostels);
      } catch (error) {
        console.error(error);
      }
    };
    // 最後記得執行 getHostelsAsync 這個function
    getHostelsAsync();
  }, []);

  return ( 
    <div className={styles.container}>
      <SearchBar></SearchBar>
      <div className={styles.content}>
        {hostels.map((hostel) => {
          return ( 
            <HostelCard 
              key={hostel.id} 
              picture={hostel.picture}
              name={hostel.name} 
              address={hostel.address}
              price={hostel.Rooms[0].price}   //取出Rooms的第一個price是最低價格
              /> 
          );
        })}
      </div>
    </div>
  ) ;
}
