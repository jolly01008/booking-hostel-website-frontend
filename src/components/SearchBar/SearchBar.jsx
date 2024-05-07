// SCSS
import styles from "./SearchBar.module.scss";
import Button from 'react-bootstrap/Button';

// hook
import { useState } from "react";
import Swal from 'sweetalert2'

//api
import { searchRooms } from "../../api/hostel.js";

export default function SearchBar({searchRoomsResults}) {
  const token = localStorage.getItem("token");

  const [keyword, setKeyword] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adults, setAdults] = useState("");
  const [kids, setKis] = useState("");
  const [searchData, setSearchData] = useState(""); // --------B直接在這邊setLocalStoreage
  
  const searchRoomsClick = async (event) => {
    event.preventDefault(); // 防止表單預設提交行為
    try {
      const searchResults = await searchRooms(keyword, checkin, checkout, adults, kids, token);
      if( searchResults.message === "找不到符合條件的資料") {
        await Swal.fire({
          title: "找不到符合條件的資料",
          text: "找不到相關結果，試試別的關鍵字。",
          timer: 2800,
          icon: "warning",
          showConfirmButton: false,
        });
        window.location.reload();
      }
      if( searchResults.message === "這段期間已經沒有可預約的房間") {
        await Swal.fire({
          title: "找不到符合條件的資料",
          text: "這段期間已沒有符合該人數條件的可預約房間",
          timer: 2800,
          icon: "warning",
          showConfirmButton: false,
        });
        window.location.reload();
      }
      setSearchData(searchResults.searchData) // 在SearchBar 直接做 setLocalStoreage
      searchRoomsResults(searchResults.results); // 將結果傳遞給父組件

      } catch (error) {
        console.error("搜尋失敗，錯誤信息：", error);
      }
  };
  localStorage.setItem('keyword', JSON.stringify(searchData.keyword) || null);
  localStorage.setItem('checkin', JSON.stringify(searchData.checkin) || null);
  localStorage.setItem('checkout', JSON.stringify(searchData.checkout) || null);
  localStorage.setItem('adults', JSON.stringify(searchData.adults) || null);
  localStorage.setItem('kids', JSON.stringify(searchData.kids) || null);

  return (
    <div>
      <form  onSubmit={searchRoomsClick} className={styles.conditionBar}>
        <div className={styles.barSet}>
          <h6 className={styles.textItem}>地點搜尋</h6>
          <input className={styles.placeInput} type="text" placeholder="輸入地點或關鍵字"
                 onChange={(e) => setKeyword(e.target.value)} value={keyword}
          />
        </div>
        <div className={styles.barSet}>
          <h6 className={styles.textItem}> 入住 </h6>
          <input className={styles.dateInput} type="date"
                 onChange={(e) => setCheckin(e.target.value)} value={checkin}
          />
          <h6>&nbsp; &nbsp;</h6>
          <h6 className={styles.textItem}> 退房 </h6>
          <input className={styles.dateInput} type="date"
                onChange={(e) => setCheckout(e.target.value)} value={checkout}
          />
        </div>
        <div className={styles.barSet}>
          <h6 className={styles.textItem}>大人 </h6>
          <input type="number" min="1" max="50" className={styles.headCountInput} placeholder="人數"
                onChange={(e) => setAdults(e.target.value)} value={adults}
          />
          <h6 className={styles.textItem}> &nbsp;  &nbsp; 孩童 </h6>
          <input type="number" min="0" max="50" className={styles.headCountInput}  placeholder="人數"
                onChange={(e) => setKis(e.target.value)} value={kids}
          />
        </div>
        <Button type="submit" variant="primary" className={styles.button}>搜尋</Button>
      </form>
    </div>
  );
}