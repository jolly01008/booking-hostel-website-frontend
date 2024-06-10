//hook
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

// components
import NavBar from "../../components/NavBar/NavBar";
import Button from '../../components/Button/Button'
import ConditionBar from '../../components/ConditionBar/ConditionBar'

// scss
import styles from "./BookingRoom.module.scss";

// api
import { getBookingRoom } from "../../api/hostel";
import { postBookingRoom } from "../../api/hostel";
import { useAuth } from "../../contexts/AuthContext";


export default function BookingRoom () {
  const { hostelId, roomId } = useParams();
  const navigate = useNavigate();

  const [singleRoomData, setSingleRoomData] = useState("");
  const [room, setRoom] = useState("");
  const [hostel, setHostel] = useState("");
   
  const [tenantName, setTenantName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { isAuthenticated, currentMember } = useAuth();
  const token = localStorage.getItem("token");
  const keyword = JSON.parse(localStorage.getItem("keyword") || null);
  const checkin = JSON.parse(localStorage.getItem("checkin") || null);
  const checkout = JSON.parse(localStorage.getItem("checkout") || null);
  const adults = JSON.parse(localStorage.getItem("adults") || null);
  const kids = JSON.parse(localStorage.getItem("kids") || null);

  const submitBookingRoom = async (event) => {
    event.preventDefault(); // 防止表單預設提交行為
    try {
      const result = await postBookingRoom(hostelId, roomId, token, keyword, checkin, checkout, adults, kids, tenantName, email, phone);
      if ( result.status === 'warning' && result.message === '這個期間，該房間的床位不足!') {
        Swal.fire({
        title: "預約失敗",
        text: '這個期間，該房間的床位不足!',
        timer: 2300,
        icon: "warning",
        showConfirmButton: false,
      })}

      if ( result.status === 'success' && result.message === '預約成功!') {
        Swal.fire({
        title: "預約成功！",
        timer: 2000,
        icon: "success",
        showConfirmButton: false,
      })
      navigate(`/users/${currentMember.id}`);
      } else {  
        Swal.fire({
        title: "預約失敗",
        text: result.message,
        timer: 2300,
        icon: "error",
        showConfirmButton: false,
      })}
    } catch (error) {
      console.error("送出預約房間失敗，錯誤信息：", error);
      Swal.fire({
        title: "出現一些錯誤，預約失敗",
        text: error.response.data.message,
        timer: 2000,
        icon: "warning",
        showConfirmButton: false,
      });
    }
  };
  const noBookingRoom = async (event) => {
    event.preventDefault(); // 防止表單預設提交行為
    try {
      localStorage.removeItem("keyword");
      localStorage.removeItem("checkin");
      localStorage.removeItem("checkout");
      localStorage.removeItem("adults");
      localStorage.removeItem("kids");
      navigate(`/hostels`);
    } catch (error) {
      console.error("發生一些錯誤，錯誤信息：", error);
    }
  };

  // 瀏覽想預約的房間 實際應用
  useEffect(() => {
    if(isAuthenticated){
      const getBookingRoomAsync = async () => {
      try {
        //後端拿到的這間房間資料，存到singleRoomData
        const singleRoomData = await getBookingRoom(hostelId, roomId, token, checkin, checkout);
        // 改變room的狀態，進而重新渲染畫面
        setSingleRoomData(singleRoomData)
        setRoom(singleRoomData.roomData);
        setHostel(singleRoomData.hostelData);
      } catch (error) {
        console.error(error);
      }
    };
    // 最後記得執行 getBookingRoomAsync 這個function
    getBookingRoomAsync();
    }
  }, [isAuthenticated, hostelId, roomId, token, checkin, checkout]);

 return (
  <div>
    <NavBar></NavBar>
    {(checkin && checkout && adults && kids) ? 
        <ConditionBar
          checkin={checkin}
          checkout={checkout}
          adults={adults}
          kids={kids}>
        </ConditionBar> 
      : null}
    <div className={styles.container}>
      <div className={styles.allBlock}>
      
      <div className={styles.hostelDatas}>
        <h6>旅館名稱: {hostel.name}</h6>
        <h6>旅館地址: {hostel.address}</h6>
        <h6>旅館介紹: {hostel.description}</h6>
      </div>
        
      <div className={styles.roomDatas}>
        <img className={styles.roomDatasImg} src={hostel.picture} alt="旅館圖片"/>
        <div></div>
        <div className={styles.roomDatasContent}>
          <p>名稱 : {room.title} </p> 
          <p>一晚價格 : $ {room.price} </p> 
          <p>設備與服務 : {room.facilities} </p> 
          <p>房間說明 :{room.description}</p>
          <p>總金額 : $ {singleRoomData.totalPrice}  </p>
        </div>
      </div>
      
      
      <div className={styles.bookingForm}>
        <div className={styles.inputSet}>
          <h6 className={styles.bookingTitle}>入住日期 </h6>
          <input className={styles.inputRow}
                     type="text" placeholder="請填日期，例如 2023-12-30"
                    //  onChange={(e) => setTypeCheckin(e.target.value)}
                     defaultValue={checkin ||  null} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                     name="checkin" readOnly />
        </div>
        <div className={styles.inputSet}>
          <h6 className={styles.bookingTitle}>退房日期 </h6>
          <input className={styles.inputRow} 
                     type="text" placeholder="請填日期，例如 2023-12-30"
                    //  onChange={(e) => setCheckout(e.target.value)}
                     defaultValue={checkout || null} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                     name="checkout" readOnly />
        </div>
        <div className={styles.inputSet}>
          <h6 className={styles.bookingTitle}>大人人數 </h6>
          <input className={styles.inputRow} 
                     type="number" placeholder="請填數字"
                    //  onChange={(e) => setAdults(e.target.value)}
                     defaultValue={adults || null} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                     name="adults" readOnly />
        </div>
        <div className={styles.inputSet}>
          <h6 className={styles.bookingTitle}>孩童人數 </h6>
          <input className={styles.inputRow} 
                     type="number" placeholder="請填數字"
                    //  onChange={(e) => setKids(e.target.value)}
                     defaultValue={kids || null} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                     name="kids" readOnly />
        </div>

        
        <div className={styles.inputSet}>
          <h6 className={styles.bookingTitle}>預約姓名 </h6>
          <input className={styles.inputRow} 
                     type="text" placeholder="請填寫全名" maxLength="10"
                     onChange={(e) => setTenantName(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                     value={tenantName} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                     name="tenantName"
                     required/>
        </div>
        <div className={styles.inputSet}>
          <h6 className={styles.bookingTitle}>預約信箱 </h6>
          <input className={styles.inputRow} 
                     type="email" placeholder="請填寫聯絡信箱"
                     onChange={(e) => setEmail(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                     value={email} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                     name="email"
                      required/>
        </div>
        <div className={styles.inputSet}>
          <h6 className={styles.bookingTitle}>預約電話 </h6>
          <input className={styles.inputRow} 
                     type="text" placeholder="請填寫聯絡電話，ex. 0912345678" maxLength="10"
                     onChange={(e) => setPhone(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                     value={phone} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                     name="phone"
                      required/>
        </div>
      </div>
        
      <div className={styles.btn}>
        <Button  title="確定送出預約" size="middle" onClick={submitBookingRoom}></Button>
        <Button  title="我再想想" size="middle"onClick={noBookingRoom}></Button>
      </div>

      </div>
    </div>



  </div>

  )
}

