//hook
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

// components
import NavBarLandlord from "../../components/NavBarLandlord/NavBarLandlord";

// scss
import styles from "./EditRoom.module.scss";

// api
import { editLandlordRoom, getEditLandlordRoom } from "../../api/landlord";


export default function EditRoom () {
  const { landlordId, hostelId, roomId } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [headcount, setHeadCount] = useState("");
  const [price, setPrice] = useState("");
  const [facilities, setFacilities] = useState(""); //顯示目前facilities
  const [newfacilities, setNewFacilities] = useState(""); //重新勾選的facilities
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState("");
  const [newPictures, setNewPictures] = useState("");

  // 勾選新項目
  const handleFacilities = (e) => {
  const newfacilities = e.target.value;
  const isChecked = e.target.checked; // 檢查是否勾選
  if (isChecked) {
    setNewFacilities(prevFacilities => [...prevFacilities, newfacilities] || null);
  } else {
    // 如果取消勾選，從陣列中移除該選項。
    // 此處的facilitie代表: value發生改變、且沒被勾選起來的facilitie。透過filter保留 "不等於 沒被勾選起來的facilitie的項目"
    setNewFacilities(prevFacilities => prevFacilities.filter(checkedItem => checkedItem !== newfacilities)  || null);
  }
};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewPictures(prevPictures => [...prevPictures, file]);
  };

  // 點擊確定編輯
  const editRoomClick = async (event) => {
    event.preventDefault(); // 防止表單預設提交行為
    try {
      await editLandlordRoom(landlordId, hostelId, roomId, token, title, type, headcount, price, facilities, newfacilities ,description, newPictures);

      navigate(`/landlords/${landlordId}/hostels/${hostelId}/rooms`);
      Swal.fire({
        title: "編輯房間成功！",
        timer: 1800,
        icon: "success",
        showConfirmButton: false,
      })
    } catch (error) {
      console.error("編輯房間失敗，錯誤信息：", error);
      Swal.fire({
        title: "編輯失敗！",
        text: error.response.data.message,
        timer: 1800,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  // 取德原本的房間資訊
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEditLandlordRoom(landlordId, hostelId, roomId, token)
        setTitle(data.title);
        setType(data.type);
        setHeadCount(data.headcount);
        setPrice(data.price);
        setFacilities(data.facilities);
        setDescription(data.description);
        setPictures(data.pictures);
      } catch (error) {
        console.log("Error getEditLandlordRoom", error);
        throw error;
      }
    };
    if (isAuthenticated && landlordId) {
      fetchData();
    }
  }, [token, landlordId, hostelId, roomId, isAuthenticated]);

  return (
    <div>
      <NavBarLandlord></NavBarLandlord>
      <div className={styles.container}>
        <div className={styles.allBlock}>

          <h5 style={{fontWeight:'bold'}}>編輯房間資訊</h5>
          <div className={styles.bookingForm}>
            <form  onSubmit={editRoomClick}>
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
                        disabled
                >
                  <option value="" disabled>--請選擇房間類型--</option>
                  <option value="private_room">獨立套房</option>
                  <option value="mixed_dorm">混合住宿</option>
                </select>
                <p style={{color:'red', fontSize:'14.5px', fontWeight:'bold', marginTop:'0.2rem'}}>*提醒，房間類型不能隨意變動。若有需要請另外創建房間。</p>
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
                {facilities? 
                  <p style={{color:'green', fontSize:'14.5px', fontWeight:'bold'}}>
                    *目前選項包括 「{facilities}」，若要維持項目，不須重新勾選。<br></br>若想重新設定選項，則再勾選一次項目。
                  </p>
                : <p style={{color:'green', fontSize:'14.5px', fontWeight:'bold'}}>目前沒有設定任何項目，若想設定選項，請勾選項目</p>}

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
              {pictures? 
                  <p style={{color:'green', fontSize:'14.5px', fontWeight:'bold'}}>
                    *目前房間圖片 「{pictures}」。<br></br>若想重新設定照片，則需再重新上傳圖片。
                  </p>
                : <p style={{color:'green', fontSize:'14.5px', fontWeight:'bold'}}>目前沒有房間圖片，若想新增，請上傳圖片檔案</p>}
              <div className={styles.roomPictures}>
                <div className={styles.roomPicture}><p className={styles.inputName}>房間圖片1 </p>
                  <input type="file" onChange={handleFileChange} name="newPictures"/>
                </div>
                <div className={styles.roomPicture}><p className={styles.inputName}>房間圖片2 </p>
                  <input type="file" onChange={handleFileChange} name="newPictures"/>
                </div>
                <div className={styles.roomPicture}><p className={styles.inputName}>房間圖片3 </p>
                  <input type="file" onChange={handleFileChange} name="newPictures"/>
                </div>
                <div className={styles.roomPicture}><p className={styles.inputName}>房間圖片4 </p>
                  <input type="file" onChange={handleFileChange} name="newPictures"/>
                </div>
                <div className={styles.roomPicture}><p className={styles.inputName}>房間圖片5 </p>
                  <input type="file" onChange={handleFileChange} name="newPictures"/>
                </div>
                <div className={styles.roomPicture}><p className={styles.inputName}>房間圖片6 </p>
                  <input type="file" onChange={handleFileChange} name="newPictures"/>
                </div>
              </div>
              <div>
                <button type="submit" className={styles.btn}> 確定編輯 </button>
              </div>
            </form>
            

          </div>
        </div>
      </div>


    </div>
  )
}
