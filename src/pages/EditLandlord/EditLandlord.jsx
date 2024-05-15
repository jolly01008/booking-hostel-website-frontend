//hook
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";

// components
import NavBarLandlord from "../../components/NavBarLandlord/NavBarLandlord";

// scss
import styles from "./EditLandlord.module.scss";

// api
import { getEditLandlord, editLandlord } from "../../api/landlord.js";


export default function EditLandlord () {
  const { landlordId } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [country, setCountry] = useState("");
  const [avatar, setAvatar] = useState("");

  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const editLandlordClick = async (event) => {
    event.preventDefault(); // 防止表單預設提交行為
    try {
      const editLandlordRes = await editLandlord(token, landlordId, name, phone, introduction, country, avatar);
      if(editLandlordRes && editLandlordRes.message === '變更成功'){
        navigate(`/landlords/${landlordId}`);
        Swal.fire({
          title: "編輯資料成功！",
          timer: 1800,
          icon: "success",
          showConfirmButton: false,
        })
      }
      
    } catch (error) {
      console.error("編輯資料失敗，錯誤信息：", error);
      throw error;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEditLandlord(token, landlordId);
        setName(data.name);
        setPhone(data.phone);
        setIntroduction(data.introduction);
        setCountry(data.country);
        setAvatar(data.avatar);
      } catch (error) {
        console.log("Error getEditUser", error);
        throw error;
      }
    };
    if (isAuthenticated && landlordId) {
      fetchData();
    }
  }, [token, landlordId, isAuthenticated]);
  return (
    <div>
      <NavBarLandlord></NavBarLandlord>
      <div className={styles.container}>
        <div className={styles.allBlock}>

          <h4 style={{fontWeight: 'bold'}}>編輯房東資料</h4>
          <div className={styles.bookingForm}>
            <form  onSubmit={editLandlordClick}>

              <div className={styles.inputSet}>
                <label className={styles.inputName}>顯示姓名 </label>
                <input className={styles.inputRow} 
                      type="text" placeholder=" ex: 王大明" maxLength={10}
                      value={name} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                      onChange={(e) => setName(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                      name="name" required/>
              </div> 

              <div className={styles.inputSet}>
                <label className={styles.inputName}>電話號碼 </label>
                <input className={styles.inputRow} 
                      type="text" placeholder=" ex: 0912345678" maxLength={10}
                      value={phone} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                      onChange={(e) => setPhone(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                      name="phone" required/>
              </div> 

              <div className={styles.inputSet}>
                <label className={styles.inputName}>居住城市 </label>
                <input className={styles.inputRow} 
                      type="text" placeholder=" ex: 台北、新加坡、美國" maxLength={10}
                      value={country} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                      onChange={(e) => setCountry(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                      name="country" required/>
              </div> 
              
              <div className={styles.inputSet}>
                <label className={styles.inputName}>關於我</label>
              </div>
              <textarea className={styles.introduction}
                        type="text" placeholder=" 可以簡單地自我介紹 "
                        value={introduction} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                        onChange={(e) => setIntroduction(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                        name="introduction"
                        required/>
              
              <div className={styles.avatarPicture}>
                <div className={styles.avatarPicture}><p className={styles.inputName}>個人頭貼 </p>
                  <input type="file" onChange={handleFileChange} name="avatar"/>
                </div>
              </div>

              <div>
                <button type="submit" className={styles.btn}> 編輯完成 </button>
              </div>
            </form>
            

          </div>
        </div>
      </div>


    </div>
  )
}
