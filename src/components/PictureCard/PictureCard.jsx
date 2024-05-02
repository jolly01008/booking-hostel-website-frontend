// scss
import styles from "./PictureCard.module.scss";

export default function PictureCard ({
  pictures,
  }) {
  return (
    <div>
      <div className={styles.picutresBlock}>
        {/* <div className={styles.roomImgBlock}>
          <img className={styles.roomImg} src={pictures[0]} alt="房間圖片"/>
        </div> */}
        
        {pictures.map((picture, index) => (
        <div key={index} className={styles.roomImgBlock}>
          <img className={styles.roomImg} src={picture} alt={`房間圖片 ${index + 1}`} />
        </div>
      ))}
      </div>

    </div>
  )
} 