// SCSS
import styles from "./ConditionBar.module.scss";

// hook
import { useNavigate } from "react-router-dom";


export default function ConditionBar ({
  checkin, checkout, adults, kids
}){
  const navigate = useNavigate()
  const noBookingRoom = async (event) => {
    event.preventDefault(); // 防止表單預設提交行為
    try {
      localStorage.removeItem("keyword");
      localStorage.removeItem("checkin");
      localStorage.removeItem("checkout");
      localStorage.removeItem("adults");
      localStorage.removeItem("kids");
      navigate(`/hostels`);
    } catch (error) {
      console.error("發生一些錯誤，錯誤信息：", error);
    }
  };

  return (
    <div>
        <div className={styles.container}>

          <div className={styles.allBlock}>
            <div className={styles.conditionBar}>

              <h5 className={styles.conditionText}>輸入的條件</h5>

              <div className={styles.barSet}>
                <h5 className={styles.conditionText}> { checkin || null } </h5>
                <h5 className={styles.conditionText}>&nbsp; ~ &nbsp;</h5>
                <h5 className={styles.conditionText}> { checkout || null } </h5>
              </div>
              <div className={styles.barSet}>
                <h5 className={styles.conditionText}>{ adults || null }位大人, &nbsp; </h5>
                <h5 className={styles.conditionText}>{ kids || null }位孩童</h5>
              </div>
              
              <h5 className={styles.conditionText}>
                <button className={styles.backHome} onClick={noBookingRoom}>回首頁更改條件</button>
              </h5>
            </div>
          </div>

        </div>
    </div>
    
  )
}