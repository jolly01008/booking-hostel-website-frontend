//hook
import { useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
// import { useNavigate, useParams } from "react-router-dom";

// components
import NavBar from "../../components/NavBar/NavBar";
import Button from '../../components/Button/Button'

// scss
import styles from "./BookingRoom.module.scss";

// api
import { postBookingRoom } from "../../api/hostel";


export default function BookingRoom () {
  const { hostelId, roomId } = useParams();
  // const navigate = useNavigate();

  const [tenantName, setTenantName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const token = localStorage.getItem("token");

  const keyword = JSON.parse(localStorage.getItem("keyword"));
  const checkin = JSON.parse(localStorage.getItem("checkin"));
  const checkout = JSON.parse(localStorage.getItem("checkout"));
  const adults = JSON.parse(localStorage.getItem("adults"));
  const kids = JSON.parse(localStorage.getItem("kids"));

  const submitBookingRoom = async (event) => {
    event.preventDefault(); // 防止表單預設提交行為
    try {
      await postBookingRoom(hostelId, roomId, token, keyword, checkin, checkout, adults, kids, tenantName, email, phone);

      // navigate(`/landlords/${landlordId}/hostels/${hostelId}/rooms`);
      Swal.fire({
        title: "預約成功！",
        timer: 1800,
        icon: "success",
        showConfirmButton: false,
      })
    } catch (error) {
      console.error("建立房間失敗，錯誤信息：", error);
      Swal.fire({
        title: "建立失敗！",
        text: error.response.data.message,
        timer: 1800,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };
  const noBookingRoom = async (event) => {
    event.preventDefault(); // 防止表單預設提交行為
    try {
      // navigate(`/landlords/${landlordId}/hostels/${hostelId}/rooms`);
    } catch (error) {
      console.error("建立房間失敗，錯誤信息：", error);
    }
  };
 return (
  <div>
    <NavBar></NavBar>
    <div className={styles.container}>
      <div className={styles.allBlock}>
        
      <div className={styles.conditionBar}>
        <h5>輸入的條件</h5>
        <div className={styles.barSet}>
          <h5> 2024年 1月15日 </h5>
          <h5>&nbsp; ~ &nbsp;</h5>
          <h5> 2024年 1月17日 </h5>
        </div>
        <div className={styles.barSet}>
          <h5>2位大人 &nbsp; </h5>
          <h5>1位孩童</h5>
        </div>
        
        <h5>回首頁更改條件</h5>
      </div>
      
      <div className={styles.hostelDatas}>
        <h6>旅館名稱: sdfjsodjfo</h6>
        <h6>旅館介紹: fjsdfsoijdfoissdfsdjfosjdfoisdjfoisjdifj，
          sidfjoisdjfoisdsdfsdfsfdsfddfjsoidjfoisdjiojdo
          ，dmfidjfisjdfojisjiosd!oisdsdfsdfsfdsfddfjsoidjfoisdjiojdo
          ，dmfidjfisjdfojisjiosd!sdsdfsdfsfsdsdfsdfsf，
          sidfjoisdjfoisdsdfsdfsfdsfddfjsoidjfoisdjiojdo
          ，dmfidjfisjdfojisjiosd!oisdsdfsdfsfdsfddfjsoidjfoisdjiojdo
          ，dmfidjfisjdfojisjiosd!sdsdfsdfsfsdsdfsdfsf，dmfidjfisjdfojisjiosd!sdsdfsdfsfsdsdfsdfs</h6>
        <h6>旅館地址: disjfoidjfoisjdoifssss</h6>
      </div>
        
      <div className={styles.roomDatas}>
        <img className={styles.roomDatasImg} src="https://www.shutterstock.com/image-photo/eiffel-tower-sunset-paris-france-600nw-556743958.jpg" alt=""/>
        <div></div>
        <div className={styles.roomDatasContent}>
          <p>名稱 : 豪華雙人房 </p> 
          <p>一晚價格 : $2500 </p> 
          <p>設備與服務 : 停車場,腳踏車租借,大樓有電梯,提供早餐 </p> 
          <p className={styles.test}>房間說明 : DFSDFSDFSDDFSDDJFOISJFOISJDOIJSDFJSOIDJFDJSOIFJDISODJFSOIDFJOISDJFOISJDFOISJDOIFJSOIDFJSIDFJFJIJJI3M4RU04CP3JI2 BP6FM,453UV;3C04SU30A40A4Y. MV06JFDJSOIFJDISODJFSOIDFJOISDJFOISJDFOISJDOV06JFDJSOIFJDISSOIFJDISODJFSOIDFJOISOIFJDISODIFJDISODJFSOIDFJIFJDISODJFSOIDFJJFSOIDFJOIODJFSOIDFJOIsss </p>
          <p>總金額 : $75000  </p>
        </div>
      </div>
      
      
      <div className={styles.bookingForm}>
        <div className={styles.inputSet}>
          <h6>入住日期 </h6>
          <input className={styles.inputRow} 
                     type="text" placeholder="請填日期，例如 2023-12-30"
                     value={checkin} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                     name="checkin"/>
        </div>
        <div className={styles.inputSet}>
          <h6>退房日期 </h6>
          <input className={styles.inputRow} 
                     type="text" placeholder="請填日期，例如 2023-12-30"
                     value={checkout} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                     name="checkout"/>
        </div>
        <div className={styles.inputSet}>
          <h6>大人人數 </h6>
          <input className={styles.inputRow} 
                     type="number" placeholder="請填數字"
                     value={adults} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                     name="adults"/>
        </div>
        <div className={styles.inputSet}>
          <h6>孩童人數 </h6>
          <input className={styles.inputRow} 
                     type="number" placeholder="請填數字"
                     value={kids} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                     name="kids"/>
        </div>

        
        <div className={styles.inputSet}>
          <h6>預約姓名 </h6>
          <input className={styles.inputRow} 
                     type="text" placeholder="請填寫全名"
                     onChange={(e) => setTenantName(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                     value={tenantName} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                     name="tenantName"/>
        </div>
        <div className={styles.inputSet}>
          <h6>預約信箱 </h6>
          <input className={styles.inputRow} 
                     type="email" placeholder="請填寫聯絡信箱"
                     onChange={(e) => setEmail(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                     value={email} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                     name="email"/>
        </div>
        <div className={styles.inputSet}>
          <h6>預約電話 </h6>
          <input className={styles.inputRow} 
                     type="text" placeholder="請填寫聯絡電話，ex. 0912345678"
                     onChange={(e) => setPhone(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                     value={phone} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                     name="phone"/>
        </div>
      </div>
        
      <div className={styles.btn}>
        <Button  title="確定送出預約" size="middle" onClick={submitBookingRoom}></Button>
        <Button  title="我再想想" size="middle" onClick={noBookingRoom}></Button>
      </div>

      </div>
    </div>



  </div>

  )
}

