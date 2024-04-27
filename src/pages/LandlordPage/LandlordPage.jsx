// //components
import NavBarLandlord from "../../components/NavBarLandlord/NavBarLandlord.jsx";

// //hook
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";

// //scss
import styles from "./LandlordPage.module.scss";

export default function LandlordPage() {
  const { landlordId } = useParams();
  const { isAuthenticated } = useAuth();

  const [landlordData, setLandlordData] = useState(null);
  const [newBooking, setNewBooking] = useState([]);
  const [pastBooking, setPastBooking] = useState([]);

  const { getLandlord } = useAuth()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLandlord(landlordId);
        setLandlordData(data.landlordData);
        setNewBooking(data.newBooking);
        setPastBooking(data.pastBooking);
      } catch (error) {
        
        console.log("Error fetching user data", error);
      }
    };
    if (isAuthenticated && landlordId) {
      fetchData();
    }
  }, [isAuthenticated, getLandlord, landlordId]);

  return (
    <div>
      <NavBarLandlord></NavBarLandlord>
      <div className={styles.container}>
        {landlordData && (
          <div className={styles.selfIntroContainer}>
            <div className={styles.avatar}>
              <img className={styles.img} src={landlordData.avatar} alt="" />
            </div>
            
            <div className={styles.introduction}>
              <h5 className={styles.aboutMe}>關於我</h5>
              <h6>{landlordData.introduction}</h6>
            </div>
            
            <div className={styles.basicInformContainer}>
              <ul className={styles.basicInform}>
                <li><h6>顯示姓名 : {landlordData.name}</h6></li>
                <li><h6>聯絡電話 : {landlordData.phone}</h6></li>
                <li><h6>國家 :  {landlordData.country}</h6></li>
              </ul>
            </div>
          </div>)}

          <div className={styles.bookingContainer}>
            <div className={styles.newBooking}>
              <h5 className={styles.title}>最新訂單紀錄</h5>
              <div className={styles.bookingTitle}>
                <h6 className={styles.bookingItem}>房間名稱</h6>
                <h6 className={styles.bookingItemDate}>日期</h6>
                <h6 className={styles.bookingItemPrice}>總價格</h6>
                <h6 className={styles.bookingItemTenant}>房客名字</h6>
              </div>
              { newBooking.length > 0 ? 
                (newBooking.map((booking) => (
                  <div key={booking.id} className={styles.bookingList}>
                    <h6 className={styles.bookingItem}>{booking.Room.title}</h6>
                    <h6 className={styles.bookingItemDate}>{booking.bookingDate} ~ {booking.checkoutDate}</h6>
                    <h6 className={styles.bookingItemPrice}>${booking.totalPrice}</h6>
                    <h6 className={styles.bookingItemTenant}>{booking.tenantName}</h6>
                  </div> 
                  )))
                  :  null }
            </div>
            
            <div className={styles.pastBooking}>
              <h5 className={styles.title}>過去訂單紀錄</h5>
              <div className={styles.bookingTitle}>
                <h6 className={styles.bookingItem}>房間名稱</h6>
                <h6 className={styles.bookingItemDate}>日期</h6>
                <h6 className={styles.bookingItemPrice}>總價格</h6>
                <h6 className={styles.bookingItemTenant}>房客名字</h6>
              </div>
              { pastBooking.length > 0 ? 
                (pastBooking.map((booking) => (
                  <div key={booking.id} className={styles.bookingList}>
                    <h6 className={styles.bookingItem}>{booking.Room.title}</h6>
                    <h6 className={styles.bookingItemDate}>{booking.bookingDate} ~ {booking.checkoutDate}</h6>
                    <h6 className={styles.bookingItemPrice}>${booking.totalPrice}</h6>
                    <h6 className={styles.bookingItemTenant}>{booking.tenantName}</h6>
                  </div> 
                  )))
                  :  null }
            </div>
          </div>


      </div>    
    </div>
  )
}
