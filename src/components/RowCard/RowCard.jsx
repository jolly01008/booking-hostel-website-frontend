
// SCSS
import styles from "./RowCard.module.scss";

export default function RowCard({
   name ,
   address ,
   description,
   picture
  }) {
  return (
    <div>
        <div className={styles.roomDatas}>
          {/* <img className={styles.roomDatasImg} src="https://www.shutterstock.com/image-photo/eiffel-tower-sunset-paris-france-600nw-556743958.jpg" alt="旅館圖片"/> */}
          <img className={styles.roomDatasImg} src={picture} alt="旅館圖片"/>
          <div className={styles.roomDatasContent}>
            <h6>名稱 : {name} </h6> 
            <h6>地址 : {address} </h6> 
            <h6 className={styles.roomDescription}>房間說明 : {description}</h6>
          </div>
        </div>
    </div>
  );
}