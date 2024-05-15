
// hook
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

// components
import NavBarLandlord from "../../components/NavBarLandlord/NavBarLandlord";

// scss
import styles from "./CreateHostel.module.scss";

// api
import { postHostel } from "../../api/landlord";


export default function CreateHostel () {
  const { landlordId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);

  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  const createHostelClick = async (event) => {
    event.preventDefault(); // 防止表單預設提交行為
    try {
      await postHostel(landlordId, token, name, address, description, picture);

      navigate(`/landlords/${landlordId}/hostels`);
      Swal.fire({
        title: "建立旅館成功！",
        timer: 1800,
        icon: "success",
        showConfirmButton: false,
      })
    } catch (error) {
      console.error("建立旅館失敗，錯誤信息：", error);
      Swal.fire({
        title: "建立失敗！",
        text: error.response.data.message,
        timer: 1800,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
      <NavBarLandlord></NavBarLandlord>
      <div className={styles.container}>
        <div className={styles.allBlock}>

          <h5>新增旅館</h5>
          <div className={styles.bookingForm}>
            <form onSubmit={createHostelClick}> {/*觸發表單的提交事件。onSubmit 是表單元素的一個事件屬性，指定了表單提交時該執行的函式 */}
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
                  <p className={styles.inputName}>旅館照片 </p>
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    name="picture"
                  />
                </div>
              </div>
              <div>
                <button className={styles.btn} type="submit"> 確定建立 </button>
              </div>
            </form>

          </div>
        </div>
      </div>


    </div>
  )
}

