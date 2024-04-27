// //components
import NavBarLandlord from "../../components/NavBarLandlord/NavBarLandlord.jsx";

// //hook
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useAuth } from "../../contexts/AuthContext.jsx";

// //scss
// import styles from "./LandlordPage.module.scss";

export default function LandlordPage() {
  // const { id, landlordId } = useParams();
  // const { isAuthenticated } = useAuth();

  // const [userData, setUserData] = useState(null);
  // const [newBookingRooms, setNewBooking] = useState([]);
  // const [pastBookingRooms, setPastBooking] = useState([]);

  // const { getUser } = useAuth()
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getUser(id);
  //       setUserData(data.userData);
  //       setNewBooking(data.newBookingRooms);
  //       setPastBooking(data.pastBookingRooms);
  //     } catch (error) {
        
  //       console.log("Error fetching user data", error);
  //     }
  //   };
  //   if (isAuthenticated && landlordId) {
  //     fetchData();
  //   }
  // }, [id, isAuthenticated, getUser, landlordId]);

  return (
    <div>
      <NavBarLandlord></NavBarLandlord>
      <h1>testLandlordPage</h1>
    </div>
  )
}
//   return (
//     <div>
//     <NavBar landlordId={landlordId}></NavBar>
//       <div className={styles.container}>
//         {userData && (
//           <div className={styles.selfIntroContainer}>
//             <div className={styles.avatar}>
//               <img className={styles.img} src={userData.avatar} alt="" />
//             </div>
            
//             <div className={styles.introduction}>
//               <h5 className={styles.aboutMe}>關於我</h5>
//               <h6>{userData.introduction}</h6>
//             </div>
            
//             <div className={styles.basicInformContainer}>
//               <ul className={styles.basicInform}>
//                 <li><h6>顯示姓名 : {userData.name}</h6></li>
//                 <li><h6>帳號信箱 : {userData.email}</h6></li>
//                 <li><h6>電話號碼 : {userData.phone}</h6></li>
//                 <li><h6>國家 :  {userData.country}</h6></li>
//               </ul>
//             </div>
//           </div>)}
          
//           <h5 className={styles.bookingHistory}>新訂房紀錄</h5>
//           <div className={styles.bookingContainer}>
//           { newBookingRooms.length > 0 ? 
//             (newBookingRooms.map((booking) => (
//               <div key={booking.id} className={styles.bookingBlock}>
//               <div className={styles.bookingImgBlock}>
//                 <img className={styles.bookingImg} src={booking.room.pictures.split(',')[0]} alt=""></img>  
//               </div>
//               <h6 className={styles.roomText}>{booking.bookingDate} ~ {booking.checkoutDate}</h6>
//               <h6 className={styles.roomText}>房型:{booking.room.title}</h6>
//               <h6 className={styles.roomText}>價格 ${booking.totalPrice}</h6>
//             </div> 
//             )))
//             :  null }
//           </div>

//           <h5 className={styles.bookingHistory}>舊訂房紀錄</h5>
//           <div className={styles.bookingContainer}>
//           { pastBookingRooms.length > 0 ? 
//             (pastBookingRooms.map((booking) => (
//               <div key={booking.id} className={styles.bookingBlock}>
//               <div className={styles.bookingImgBlock}>
//                 <img className={styles.bookingImg} src={booking.room.pictures.split(',')[0]} alt=""></img>  
//               </div>
//               <h6 className={styles.roomText}>{booking.bookingDate} ~ {booking.checkoutDate}</h6>
//               <h6 className={styles.roomText}>房型:{booking.room.title}</h6>
//               <h6 className={styles.roomText}>價格 ${booking.totalPrice}</h6>
//             </div> 
//             )))
//             :  null }
//               </div>
//           </div>
    
//     </div>
//   )
// }
