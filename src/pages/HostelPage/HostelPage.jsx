// components
import NavBar from "../../components/NavBar/NavBar";
import NavBarLandlord from "../../components/NavBarLandlord/NavBarLandlord";
import RoomCard from "../../components/RoomCard/RoomCard.jsx";

// hook
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { NavLink } from 'react-router-dom';

//api
import { getHostelPage } from "../../api/hostel.js";

// scss
import styles from "./HostelPage.module.scss";

export default function HostelPage () {
  const { hostelId } = useParams();
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const currentRole = localStorage.getItem("currentRole");

  const [hostel, setHostel] = useState("");
  const [landlord, setLandlord] = useState("");
  const [rooms, setRooms] = useState([]);

  // 瀏覽rooms的實際應用
  useEffect(() => {
    if(isAuthenticated){
      const getHostelPageAsync = async () => {
      try {
        //後端拿到的所有資料存到hostel
        const hostel = await getHostelPage(hostelId, token);
        // 改變hostel、rooms、landlord的狀態，進而重新渲染畫面
        setHostel(hostel.hostelData)
        setRooms(hostel.hostelData.Rooms);
        setLandlord(hostel.landlordData);
      } catch (error) {
        console.error(error);
      }
    };
    // 最後記得執行 getHostelPageAsync 這個function
    getHostelPageAsync();
    }
  }, [isAuthenticated, token, hostelId]);


  return (
    <div>
      {(role === "tenant" || role === "landlord")
         && currentRole === "tenant" ?  <NavBar></NavBar> : null }
      {role === "landlord" && currentRole === "landlord"?  <NavBarLandlord></NavBarLandlord> : null }
      <div className={styles.container}>
              <div className={styles.allRoomsDatas}>
                <div className={styles.hostelAndLandlord}>
                  {hostel ? (
                  <div className={styles.hostelData}>
                    <h5 style={{ fontWeight: "bold" }}>旅館資訊</h5>
                    <p className={styles.text}>名字 : {hostel.name}</p>
                    <p className={styles.text}>地址 : {hostel.address}</p>
                    <p className={styles.text}>介紹 : {hostel.description}</p>
                  </div> ) : null}

                  {landlord ? (
                    <div className={styles.landlordData}>
                      <h5 style={{ fontWeight: "bold" }}>房東資訊</h5>
                      <p className={styles.text}>名字 : {landlord.name}</p>
                      <p className={styles.text} style={{ lineHeight: '0px' }}>自介:</p>
                      <p className={styles.text}>{landlord.introduction}</p>
                      <p className={styles.text}>電話 : {landlord.phone}</p>
                      <p className={styles.text}>城市 : {landlord.country}</p>
                    </div> ) : null} 
                </div>
                
                <div className={styles.roomContainer}>
                    {rooms.length > 0 ? (
                    rooms.map((room) => (
                    <NavLink className={styles.NavLink}  key={room.id} 
                            to={`/hostels/${hostelId}/rooms/${room.id}`}>
                    <RoomCard
                      title={room.title}
                      price={room.price}
                      pictures={JSON.parse(room.pictures)}
                    />
                    </NavLink>
                    ))
                  ) : (
                    <h5>該旅館尚未有任何房間。可先參考其他旅館</h5>
                  )}
                </div>
                     
              </div>
              

      </div>
    </div>
  )
} 