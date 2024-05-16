// components
import NavBarLandlord from "../../components/NavBarLandlord/NavBarLandlord";
import RoomCard from "../../components/RoomCard/RoomCard.jsx";

// hook
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { NavLink } from 'react-router-dom';

//api
import { getLandlordHostel } from "../../api/landlord.js";

// scss
import styles from "./LandlordHostel.module.scss";

export default function LandlordHostel () {
  const { landlordId, hostelId } = useParams();
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("token");

  const [hostel, setHostel] = useState("");
  const [rooms, setRooms] = useState([]);

  // 瀏覽rooms的實際應用
  useEffect(() => {
    if(isAuthenticated){
      const getLandlordHostelAsync = async () => {
      try {
        //後端拿到的所有資料存到datasOfRoom
        const datasOfRoom = await getLandlordHostel(landlordId, hostelId, token);
        // 改變hostel、rooms的狀態，進而重新渲染畫面
        setHostel(datasOfRoom.data)
        setRooms(datasOfRoom.data.allRooms);
      } catch (error) {
        console.error(error);
      }
    };
    // 最後記得執行 getLandlordHostelAsync 這個function
    getLandlordHostelAsync();
    }
  }, [isAuthenticated, token, hostelId, landlordId]);

  return (
    <div>
      <NavBarLandlord></NavBarLandlord>
      <div className={styles.container}>
              <div className={styles.allRoomsDatas}>
                {hostel ? (
                  <div className={styles.hostelData}>
                    <h4 style={{fontWeight:'bold'}}>旅館資訊</h4>
                    <br />
                    <p className={styles.text}>{hostel.HostelName}</p>
                    <p className={styles.text}>{hostel.HostelAddress}</p>
                    <p className={styles.text}>{hostel.Hosteldescription}</p>
                  </div> ) : null} 
                
              <div className={styles.roomContainer}>
                  {rooms.length > 0 ? (
                  rooms.map((room) => (
                  <NavLink className={styles.NavLink}  key={room.id} 
                          to={`/landlords/${landlordId}/hostels/${hostelId}/rooms/${room.id}`}>
                  <RoomCard
                    title={room.title}
                    price={room.price}
                    pictures={JSON.parse(room.pictures)}
                  />
                  </NavLink>
                  ))
                ) : (
                  <h5>尚未有任何房間。請增加房間</h5>
                )}
              </div>
                     
              </div>

              <div>
                <NavLink to={`/landlords/${landlordId}/hostels/${hostelId}/createRoom`}>
                  <button type="submit" className={styles.btn}> 對此旅館新增房間 </button>
                </NavLink>
              </div>

      </div>
        
    </div>
  )
} 