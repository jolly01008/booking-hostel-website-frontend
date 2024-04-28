// components
import NavBarLandlord from "../../components/NavBarLandlord/NavBarLandlord";

// scss
import styles from "./CreateRoom.module.scss";


export default function CreateRoom () {
    
  return (
    <div>
      <NavBarLandlord></NavBarLandlord>
      <div className={styles.container}>
        <div className={styles.allBlock}>

          <h5>新增房間</h5>
          <div className={styles.bookingForm}>
            <div className={styles.inputSet}>
              <label className={styles.inputName}>房間標題 </label><input className={styles.inputRow} type="text" 
              placeholder=" ex: 豪華雙人房、好朋友四人房..."/>
            </div> 
            <div className={styles.inputSet}>
              <label  className={styles.inputName} for="selectRoomType">房間類型</label>
              <select name="roomType" id="selectRoomType" className={styles.inputRow}>
                <option value="">房間類型</option>
                <option value="dog">獨立套房</option>
                <option value="cat">混合住宿</option>
              </select>
            </div>
            
            <div className={styles.inputSet}>
              <label className={styles.inputName}>床位張數 </label>
              <input className={styles.inputRow} type="number" min="0" max="50" placeholder=" 請輸入數字 "/>
            </div>
            <div className={styles.inputSet}>
              <label className={styles.inputName}>房客人數 </label>
              <input className={styles.inputRow} type="number" min="0" max="50" placeholder=" 請輸入數字 "/>
            </div>
            <div className={styles.inputSet}>
              <label className={styles.inputName}>一晚價格 </label>
              <input className={styles.inputRow} type="number" min="0" placeholder=" 請輸入數字 "/>
            </div>
            
            <div className={styles.inputSet}>
              <label className={styles.inputName}>服務設備</label>
              <label className={styles.inputName}><input type="checkbox" name="color1" value="blue"/>早餐</label>
              <label className={styles.inputName}><input type="checkbox" name="color4" value="green"/>獨立衛浴</label>
              <label className={styles.inputName}><input type="checkbox" name="color2" value="yellow"/>洗衣機</label>
              <label className={styles.inputName}><input type="checkbox" name="color3" value="red"/>電視</label>
              <label className={styles.inputName}><input type="checkbox" name="color4" value="green"/>飲水機</label>
              <label className={styles.inputName}><input type="checkbox" name="color4" value="green"/>空調設備</label>
              <label className={styles.inputName}><input type="checkbox" name="color4" value="green"/>Wifi</label>
              <label className={styles.inputName}><input type="checkbox" name="color1" value="blue"/>停車場</label>
            </div>
            <div className={styles.inputSet}>
              <label className={styles.inputName}>房間描述</label>
            </div>
            <textarea className={styles.description}></textarea>
            
            <div className={styles.inputSet}>
              <label className={styles.inputName}>房間圖片 </label>
            </div>
            <div className={styles.roomPictures}>
              <div className={styles.roomPicture}><p className={styles.inputName}>房間圖片1 </p><input type="file"/></div>
              <div className={styles.roomPicture}><p className={styles.inputName}>房間圖片2 </p><input type="file"/></div>
              <div className={styles.roomPicture}><p className={styles.inputName}>房間圖片3 </p><input type="file"/></div>
              <div className={styles.roomPicture}><p className={styles.inputName}>房間圖片4 </p><input type="file"/></div>
              <div className={styles.roomPicture}><p className={styles.inputName}>房間圖片5 </p><input type="file"/></div>
              <div className={styles.roomPicture}><p className={styles.inputName}>房間圖片6 </p><input type="file"/></div>
            </div>
            <div className={styles.btn}>
              <button> 確定建立 </button>
            </div>

          </div>
        </div>
      </div>


    </div>
  )
}



