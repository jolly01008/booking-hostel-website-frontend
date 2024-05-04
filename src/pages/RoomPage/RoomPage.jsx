// components
import NavBar from "../../components/NavBar/NavBar";
import PictureCard from "../../components/PictureCard/PictureCard.jsx";

// hook
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";

//api
import { getRoomPage } from "../../api/hostel.js";

// scss
import styles from "./RoomPage.module.scss";

export default function RoomPage () {
  const { hostelId, roomId } = useParams();
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("token");

  const [room, setRoom] = useState("");
  const [hostel, setHostel] = useState("");

  // 瀏覽room的實際應用
  useEffect(() => {
    if(isAuthenticated){
      const getRoomAsync = async () => {
      try {
        //後端拿到的所有資料存到room
        const singleRoomData = await getRoomPage(hostelId, roomId, token);
        console.log('singleRoomData內容:', singleRoomData)
        // 改變hostel、singleRoomData的狀態，進而重新渲染畫面
        setRoom(singleRoomData.roomData);
        setHostel(singleRoomData.roomData.Hostel)
      } catch (error) {
        console.error(error);
      }
    };
    // 最後記得執行 getRoomAsync 這個function
    getRoomAsync();
    }
  }, [isAuthenticated, token, hostelId, roomId]);

  return (
    <div>
      <NavBar></NavBar>
      <div className={styles.container}>
              <div className={styles.SingleRoomDatas}>
                  <div>
                    <h4 style={{ marginBottom: "1.5rem", fontWeight: "bold" }}>{room.title} 的相關資訊</h4>
                    { room ? (
                      <PictureCard
                        pictures={JSON.parse(room.pictures)}
                      />
                    ) : (
                      <h5>該房間尚未有圖片</h5>
                    )}
                  </div>
                  <div className={styles.roomTextDatas}>
                    <p className={styles.text}>◾房間名稱 : {room.title}</p>
                    <p className={styles.text}>◾房間類型 : {room.type}</p>
                    <p className={styles.text}>◾房間描述 : <br/>{room.description}</p>
                    <p className={styles.text}>◾一晚價格 : ${room.price}</p>
                    <p className={styles.text}>◾提供設備 : {room.facilities}</p>
                    <br />
                    <p className={styles.text}>◾旅館名稱 : {hostel.name}</p>
                    <p className={styles.text}>◾旅館地址 : {hostel.address}</p>
                  </div>
                     
              </div>
              
      </div>
        
    </div>
  )
} 