// components 
import HostelCard from "../../components/HostelCard/HostelCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import NavBar from "../../components/NavBar/NavBar";
import RoomCard from "../../components/RoomCard/RoomCard.jsx";

//api
import { getHostels } from '../../api/hostel';
import { useAuth } from "../../contexts/AuthContext";

//hook
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from 'react-router-dom';

// SCSS
import styles from "./MainPage.module.scss";


export default function MainPage() {
  const [hostels, setHostels] = useState([]);
  const [searchRooms, setSearchRooms] = useState([]); // 承接從SearchBar傳來的searchRooms資料，設定狀態

  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("token");

  const searchBarDatas = async (datas) => {
    setSearchRooms(datas);
  };

  // 瀏覽hostels的實際應用
  useEffect(() => {
    if(isAuthenticated){
      const getHostelsAsync = async () => {
      try {
        //後端拿到的資料存到hostels
        const hostels = await getHostels(token);
        // 改變hostels的狀態，進而重新渲染畫面
        setHostels(hostels);
      } catch (error) {
        console.error(error);
      }
    };
    // 最後記得執行 getHostelsAsync 這個function
    getHostelsAsync();
    }
  }, [isAuthenticated, token]);
  
  return ( 
    <div>
      <NavBar></NavBar>
      <div className={styles.container}>
        <SearchBar searchRoomsResults={searchBarDatas}></SearchBar >
        
        {searchRooms.length > 0 ? 
        <div>
            <h3 className={styles.searchResults}>搜尋結果如下</h3>
            <div className={styles.roomContainer}>
              {searchRooms.length > 0 ? (
              searchRooms.map((room) => (
              <NavLink className={styles.NavLink}  key={room.id} 
                              to={`/hostels/${room.Hostel.id}/rooms/${room.id}`}>
              <RoomCard
                title={room.title}
                price={room.price}
                pictures={JSON.parse(room.pictures)} />
              </NavLink>
            ))
            ) : null }
            </div>
        </div> 
        : 
        <div className={styles.content}>
          {hostels.map((hostel) => {
            return ( 
              <HostelCard 
                key={hostel.id} 
                hostelId={hostel.id}
                picture={hostel.picture}
                name={hostel.name} 
                address={hostel.address}
                price={hostel.Rooms.length > 0?hostel.Rooms[0].price : "(該房間尚未設定完畢)"}   //取出Rooms的第一個price是最低價格
                /> );
          })}
        </div>
        }
        
      </div>
    </div>
  ) ;
}
