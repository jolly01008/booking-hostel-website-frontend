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
  // const [searchData, setSearchData] = useState("");
  
  const searchRoomsClick = async (event) => {
    event.preventDefault(); // 防止表單預設提交行為
    try {
      const searchResults = await searchRooms(keyword, checkin, checkout, adults, kids, token);

      if( searchResults.message === "找不到符合條件的資料") {
        await Swal.fire({
          title: "搜尋失敗",
          text: "找不到相關的結果，請試試別的關鍵字",
          timer: 2800,
          icon: "warning",
          showConfirmButton: false,
        });
        window.location.reload();
      }

      searchRoomsResults(searchResults.results); // 將結果傳遞給父組件
      // setSearchData(searchResults.searchData)

      } catch (error) {
        console.error("搜尋失敗，錯誤信息：", error);
      }
  };

  return (
    <div>
      <form  onSubmit={searchRoomsClick} className={styles.conditionBar}>
        <div className={styles.barSet}>
          <h6 className={styles.textItem}>地點搜尋</h6>
          <input className={styles.placeInput} type="text" placeholder="你想去哪裡~"
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