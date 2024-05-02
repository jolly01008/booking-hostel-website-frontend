// scss
import styles from "./RoomCard.module.scss";

export default function RoomCard ({
  title,
  price,
  pictures
  }) {
  return (
    <div>
        <div className={styles.roomContainer}>
          <div className={styles.roomBlock}>
            <div className={styles.roomImgBlock}>
              <img className={styles.roomImg} src={pictures[0]} alt="房間圖片"/>
            </div>
            <p className={styles.text}>{title}</p>
            <p className={styles.text}>價格: ${price}</p>
          </div>
        </div>

    </div>
  )
} 