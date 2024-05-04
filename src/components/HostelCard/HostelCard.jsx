
// SCSS
import styles from "./HostelCard.module.scss";
import { NavLink } from 'react-router-dom';

export default function HostelCard({
   hostelId,
   picture ,
   name ,
   address,
   price
  }) {
  return (
    <div>
      <NavLink to={`/hostels/${hostelId}`}>
      <div className={styles.hostelContainer}>
          <div className={styles.hostelBlock}>
            <div className={styles.hostelImgBlock}>
              <img className={styles.hostelImg} src={picture} alt="旅館圖片"/>
            </div>
            <p className={styles.hostelName}>{name}</p>
            <p className={styles.text}>地址: {address}</p>
            <p className={styles.text}>起價: ${price}</p>
          </div>
      </div></NavLink>
    </div>
  );
}