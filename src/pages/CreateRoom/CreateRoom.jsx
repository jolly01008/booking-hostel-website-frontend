//hook
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

// components
import NavBarLandlord from "../../components/NavBarLandlord/NavBarLandlord";

// scss
import styles from "./CreateRoom.module.scss";

// api
import { postRoom } from "../../api/landlord";


export default function CreateRoom () {
  const { landlordId, hostelId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [headcount, setHeadCount] = useState("");
  const [price, setPrice] = useState("");
  const [facilities, setFacilities] = useState("");
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState("");

  const token = localStorage.getItem("token");

  const handleFacilities = (e) => {
  const facilitie = e.target.value;
  const isChecked = e.target.checked; // 檢查是否勾選
  if (isChecked) {
    setFacilities(prevFacilities => [...prevFacilities, facilitie]);
  } else {
    // 如果取消勾選，從陣列中移除該選項。
    // 此處的facilitie代表: value發生改變、且沒被勾選起來的facilitie。透過filter保留 "不等於 沒被勾選起來的facilitie的項目"
    setFacilities(prevFacilities => prevFacilities.filter(checkedItem => checkedItem !== facilitie));
  }
};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPictures(prevPictures => [...prevPictures, file]);
  };

  const createRoomClick = async (event) => {
    event.preventDefault(); // 防止表單預設提交行為
    try {
      await postRoom(landlordId, hostelId, token, title, type, headcount, price, facilities ,description, pictures);

      navigate(`/landlords/${landlordId}/hostels/${hostelId}/rooms`);
      Swal.fire({
        title: "建立房間成功！",
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
  return (
    <div>
      <NavBarLandlord></NavBarLandlord>
      <div className={styles.container}>
        <div className={styles.allBlock}>

          <h5>新增房間</h5>
          <div className={styles.bookingForm}>
            <form  onSubmit={createRoomClick}>
              <div className={styles.inputSet}>
              <label className={styles.inputName}>房間標題 </label>
              <input className={styles.inputRow} 
                     type="text" placeholder=" ex: 豪華雙人房、好朋友四人房..."
                     value={title} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                     onChange={(e) => setTitle(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                     name="title"/>
              </div> 
              <div className={styles.inputSet}>
                <label  className={styles.inputName} htmlFor="selectRoomType">房間類型</label>
                <select name="type" id="selectRoomType" className={styles.inputRow}
                        value={type} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                        onChange={(e) => setType(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                        required
                >
                  <option value="" disabled>--請選擇房間類型--</option>
                  <option value="private_room">獨立套房</option>
                  <option value="mixed_dorm">混合住宿</option>
                </select>
              </div>
              
              <div className={styles.inputSet}>
                <label className={styles.inputName}>住客人數 </label>
                <input className={styles.inputRow} 
                      type="number" min="0" max="50" placeholder=" 請輸入數字"
                      value={headcount} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                      onChange={(e) => setHeadCount(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                      name="headcount"
                      required/>
              </div>
              <div className={styles.inputSet}>
                <label className={styles.inputName}>一晚價格 </label>
                <input className={styles.inputRow} 
                      type="number" min="0" placeholder=" 請輸入數字 "
                      value={price} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                      onChange={(e) => setPrice(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                      name="price"
                      required/>
              </div>
              
              <div className={styles.inputSet}>
                <label className={styles.inputName}>服務設備</label>
                <label className={styles.inputName}>
                  <input type="checkbox"  onChange={handleFacilities} name="facilities" value="早餐"/>早餐</label>
                <label className={styles.inputName}>
                  <input type="checkbox"  onChange={handleFacilities} name="facilities" value="獨立衛浴"/>獨立衛浴</label>
                <label className={styles.inputName}>
                  <input type="checkbox"  onChange={handleFacilities} name="facilities" value="洗衣機"/>洗衣機</label>
                <label className={styles.inputName}>
                  <input type="checkbox"  onChange={handleFacilities} name="facilities" value="電視"/>電視</label>
                <label className={styles.inputName}>
                  <input type="checkbox"  onChange={handleFacilities} name="facilities" value="飲水機"/>飲水機</label>
                <label className={styles.inputName}>
                  <input type="checkbox"  onChange={handleFacilities} name="facilities" value="空調設備"/>空調設備</label>
                <label className={styles.inputName}>
                  <input type="checkbox"  onChange={handleFacilities} name="facilities" value="wifi"/>Wifi</label>
                <label className={styles.inputName}>
                  <input type="checkbox"  onChange={handleFacilities} name="facilities" value="停車場"/>停車場</label>
              </div>
              <div className={styles.inputSet}>
                <label className={styles.inputName}>房間描述</label>
              </div>
              <textarea className={styles.description}
                        type="text" placeholder=" 請輸入房間的詳細描述 "
                        value={description} // 添加value屬性。把值綁定到 React 的狀態變量，讓React知道當前的值 
                        onChange={(e) => setDescription(e.target.value)} // 添加onChange事件處理函式(onChange是當輸入框的值發生變化應執行的函式)
                        name="description"
                        required/>
              
              <div className={styles.inputSet}>
                <label className={styles.inputName}>房間圖片 </label>
              </div>
              <div className={styles.roomPictures}>
                <div className={styles.roomPicture}><p className={styles.inputName}>房間圖片1 </p>
                  <input type="file" onChange={handleFileChange} name="pictures"/>
                </div>
                <div className={styles.roomPicture}><p className={styles.inputName}>房間圖片2 </p>
                  <input type="file" onChange={handleFileChange} name="pictures"/>
                </div>
                <div className={styles.roomPicture}><p className={styles.inputName}>房間圖片3 </p>
                  <input type="file" onChange={handleFileChange} name="pictures"/>
                </div>
                <div className={styles.roomPicture}><p className={styles.inputName}>房間圖片4 </p>
                  <input type="file" onChange={handleFileChange} name="pictures"/>
                </div>
                <div className={styles.roomPicture}><p className={styles.inputName}>房間圖片5 </p>
                  <input type="file" onChange={handleFileChange} name="pictures"/>
                </div>
                <div className={styles.roomPicture}><p className={styles.inputName}>房間圖片6 </p>
                  <input type="file" onChange={handleFileChange} name="pictures"/>
                </div>
              </div>
              <div>
                <button type="submit" className={styles.btn}> 確定建立 </button>
              </div>
            </form>
            

          </div>
        </div>
      </div>


    </div>
  )
}
