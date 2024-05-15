//hook
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";

// components
import NavBar from "../../components/NavBar/NavBar";

// scss
import styles from "./EditUser.module.scss";

// api
import { getEditUser } from "../../api/user";
import { editUser } from "../../api/user";


export default function CreateRoom () {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
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

  const editUserClick = async (event) => {
    event.preventDefault(); // 防止表單預設提交行為
    try {
      const editUserRes = await editUser(token, id, email, name, phone, introduction, country, avatar);
      if(editUserRes && editUserRes.message === '變更成功'){
        navigate(`/users/${id}`);
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
        const data = await getEditUser(token, id);
        setEmail(data.email);
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
    if (isAuthenticated && id) {
      fetchData();
    }
  }, [token, id, isAuthenticated]);
  return (
    <div>
      <NavBar></NavBar>
      <div className={styles.container}>
        <div className={styles.allBlock}>

          <h4 style={{fontWeight: 'bold'}}>編輯個人資料</h4>
          <div className={styles.bookingForm}>
            <form  onSubmit={editUserClick}>

              <div className={styles.inputSet}>
                <label className={styles.inputName}>帳號信箱 </label>
                <input className={styles.inputRow} 
                      type="email" placeholder=" ex: test@example.com" maxLength={25}
                      value={email} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                      onChange={(e) => setEmail(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                      name="email" required/>
              </div> 
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
