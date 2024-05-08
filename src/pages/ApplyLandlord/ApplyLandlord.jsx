//hook
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

// components
import NavBar from "../../components/NavBar/NavBar";

// scss
import styles from "./ApplyLandlord.module.scss";

// api
import { postApplyLandlord } from "../../api/user";


export default function ApplyLandlord () {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [avatar, setAvatar] = useState("");

  const token = localStorage.getItem("token");

  console.log('avatar', avatar)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const applyLandlordClick = async (event) => {
    event.preventDefault(); // 防止表單預設提交行為
    try {
      await postApplyLandlord(id, token, name, introduction, phone, country, avatar);

      navigate(`/hostels`);
      Swal.fire({
        title: "申請房東成功",
        text: "可以開始瀏覽自己的房東資訊、創建房源!",
        timer: 2000,
        icon: "success",
        showConfirmButton: false,
      })
    } catch (error) {
      console.error("申請房東失敗，錯誤信息：", error);
      Swal.fire({
        title: "申請失敗！",
        text: error.response.data.message,
        timer: 1800,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };
  return (
    <div>
      <NavBar></NavBar>
      <div className={styles.container}>
        <div className={styles.allBlock}>

          <h3 style={{fontWeight:"Bold"}}>申請成房東</h3>
          <div className={styles.applyLandlordForm}>
            <form  onSubmit={applyLandlordClick}>
              
              <div className={styles.inputSet}>
                <label className={styles.inputName}>房東名字 </label>
                <input className={styles.inputRow} 
                      type="text" placeholder="房東身分所顯示的名字" maxLength="8"
                      value={name} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                      onChange={(e) => setName(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                      name="name"
                      required/>
              </div>
              <div className={styles.inputSet}>
                <label className={styles.inputName}>房東電話 </label>
                <input className={styles.inputRow} 
                      type="text" placeholder="房東身分的聯絡電話，ex.0912345678" maxLength="10"
                      value={phone} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                      onChange={(e) => setPhone(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                      name="phone"
                      required/>
              </div>
              <div className={styles.inputSet}>
                <label className={styles.inputName}>所在城市 </label>
                <input className={styles.inputRow} 
                      type="text" placeholder="你所居住的國家或城市" maxLength="15"
                      value={country} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                      onChange={(e) => setCountry(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                      name="country"
                      required/>
              </div>
              <div className={styles.inputSet}>
                <label className={styles.inputName}>房東介紹</label>
              </div>
              <textarea className={styles.description}
                        type="text" placeholder="介紹你自己" maxLength="150"
                        value={introduction} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                        onChange={(e) => setIntroduction(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                        name="introduction"
                        required/>
              
              <div className={styles.landlordAvatar}><p className={styles.inputName}>房東頭貼 </p>
                <input type="file" onChange={handleFileChange} name="avatar"/>
              </div>

              <button className={styles.btn} type="submit">確定申請</button>

            </form>
            

          </div>
        </div>
      </div>


    </div>
  )
}
