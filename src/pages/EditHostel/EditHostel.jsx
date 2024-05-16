//hook
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

// components
import NavBarLandlord from "../../components/NavBarLandlord/NavBarLandlord";

// scss
import styles from "./EditHostel.module.scss";

// api
import { editHostel, getEditHostel } from "../../api/landlord";


export default function EditHostel () {
  const { landlordId, hostelId } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [newPicture, setNewPicture] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewPicture(file);
  };

  // 點擊確定編輯
  const editHostelClick = async (event) => {
    event.preventDefault(); // 防止表單預設提交行為
    try {
      await editHostel(landlordId, hostelId, token, name, address, description, newPicture);

      navigate(`/landlords/${landlordId}/hostels`);
      Swal.fire({
        title: "編輯旅館成功！",
        timer: 1800,
        icon: "success",
        showConfirmButton: false,
      })
    } catch (error) {
      console.error("編輯旅館失敗，錯誤信息：", error);
      Swal.fire({
        title: "編輯失敗！",
        text: error.response.data.message,
        timer: 1800,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  // 取德原本的旅館資訊
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEditHostel(landlordId, hostelId, token)
        setName(data.name);
        setAddress(data.address);
        setDescription(data.description);
        setPicture(data.picture);
      } catch (error) {
        console.log("Error getEditHostel", error);
        throw error;
      }
    };
    if (isAuthenticated && landlordId) {
      fetchData();
    }
  }, [token, landlordId, hostelId, isAuthenticated]);

  return (
    <div>
      <NavBarLandlord></NavBarLandlord>
      <div className={styles.container}>
        <div className={styles.allBlock}>

          <h5 style={{fontWeight:'bold'}}>編輯旅館資訊</h5>
          <div className={styles.bookingForm}>
            <form onSubmit={editHostelClick}> {/*觸發表單的提交事件。onSubmit 是表單元素的一個事件屬性，指定了表單提交時該執行的函式 */}
              <div className={styles.inputSet}>
                <label className={styles.inputName}>旅館名稱 </label>
                <input
                  className={styles.inputRow}
                  type="text"
                  placeholder=" 請輸入旅館名稱"
                  value={name} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                  onChange={(e) => setName(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                  name="name"
                  required
                />
              </div>
              <div className={styles.inputSet}>
                <label className={styles.inputName}>旅館地址 </label>
                <input
                  className={styles.inputRow}
                  type="text"
                  placeholder=" 請輸入旅館確切地址"
                  value={address} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                  onChange={(e) => setAddress(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                  name="address"
                  required
                />
              </div>
              <div className={styles.inputSet}>
                <label className={styles.inputName}>旅館說明</label>
                <textarea
                  className={styles.description}
                  placeholder=" 旅館的介紹、說明"
                  value={description} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                  onChange={(e) => setDescription(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                  name="description"
                  required
                ></textarea>
              </div>
              <div className={styles.inputSet}>
                <div className={styles.hostelPicture}>
                  <h6 className={styles.inputName}>旅館照片 </h6>
                  {picture? 
                    <p style={{color:'green', fontSize:'14.5px', fontWeight:'bold'}}>
                      *目前旅館圖片是 「{picture}」若想維持原本圖片不需再上傳。<br></br>若想重新設定照片，則要重新上傳圖片。
                    </p>
                    : <p style={{color:'green', fontSize:'14.5px', fontWeight:'bold'}}>目前沒有旅館圖片，若想新增，請上傳圖片檔案</p>
                  }
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    name="newPicture"
                  />
                </div>
              </div>
              <div>
                <button className={styles.btn} type="submit"> 確定編輯更改 </button>
              </div>
            </form>

          </div>
        </div>
      </div>


    </div>
  )
}
