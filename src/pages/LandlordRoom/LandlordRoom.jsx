// components
import NavBarLandlord from "../../components/NavBarLandlord/NavBarLandlord";
import PictureCard from "../../components/PictureCard/PictureCard.jsx";

// hook
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Swal from "sweetalert2";

//api
import { getLandlordRoom, deleteLandlordRoom } from "../../api/landlord.js";

// scss
import styles from "./LandlordRoom.module.scss";

export default function LandlordHostel () {
  const navigate = useNavigate()

  const { landlordId, hostelId, roomId } = useParams();
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("token");

  const [room, setRoom] = useState("");
  const [hostel, setHostel] = useState("");

  // 點擊 刪除房間 按鈕
  const deleteRoomClick = async () => {
    try {
      const data = await deleteLandlordRoom(landlordId, hostelId, roomId, token);
      if(data && data.message === '成功刪除該房源'){
        navigate(`/landlords/${landlordId}/hostels/${hostelId}/rooms`);
        Swal.fire({
          title: "成功刪除房間",
          timer: 3000,
          icon: "success",
          showConfirmButton: false,
        })
      }else {
        navigate(`/landlords/${landlordId}/hostels/${hostelId}/rooms`);
        Swal.fire({
          title: "刪除房間失敗",
          text: "請確認刪除的房間，是否為自己的房源",
          timer: 3000,
          icon: "warning",
          showConfirmButton: false,
        })
      }
    } catch (error) {
      console.error("刪除房間失敗，錯誤信息：", error);
      Swal.fire({
        title: "刪除房間失敗",
        text: error.response.data.message,
        timer: 3000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  // 瀏覽room的實際應用
  useEffect(() => {
    if(isAuthenticated){
      const getLandlordRoomAsync = async () => {
      try {
        //後端拿到的所有資料存到room
        const singleRoomData = await getLandlordRoom(landlordId, hostelId, roomId, token);
        // 改變hostel、singleRoomData的狀態，進而重新渲染畫面
        setRoom(singleRoomData.data);
        setHostel(singleRoomData.data.Hostel)
      } catch (error) {
        console.error(error);
      }
    };
    // 最後記得執行 getLandlordRoomAsync 這個function
    getLandlordRoomAsync();
    }
  }, [isAuthenticated, token, landlordId, hostelId, roomId]);

  return (
    <div>
      <NavBarLandlord></NavBarLandlord>
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
                      <p className={styles.text}>◾房間名稱: {room.title}</p>
                      <p className={styles.text}>◾房間類型: {room.type}</p>
                      <p className={styles.text}>◾房間描述: <br/>{room.description}</p>
                      <p className={styles.text}>◾一晚價格: ${room.price}</p>
                      <p className={styles.text}>◾提供設備: {room.facilities}</p>
                      <br />
                      <p className={styles.text}>◾旅館名稱: {hostel.name}</p>
                      <p className={styles.text}>◾旅館地址: {hostel.address}</p>
                    </div>
                     
              </div>

              <div className={styles.btnContainer}>
                <a style={{textDecoration: 'none'}} href={`/landlords/${landlordId}/hostels/${hostelId}/rooms/${roomId}/edit`}>
                  <button type="submit" className={styles.btn}>編輯房間資料</button>
                </a>

                <button type="button" className={styles.btn} style={{background: 'red'}} onClick={deleteRoomClick}>刪除房間</button>
              </div>

      </div>
        
    </div>
  )
} 