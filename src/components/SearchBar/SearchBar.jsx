// SCSS
import styles from "./SearchBar.module.scss";
import Button from 'react-bootstrap/Button';

export default function SearchBar() {
  return (
    <div className={styles.conditionBar}>
    <div className={styles.barSet}>
      <h6 className={styles.textItem}>地點搜尋</h6>
      <input className={styles.placeInput} type="text" placeholder="你想去哪裡~"/>
    </div>
    <div className={styles.barSet}>
      <h6 className={styles.textItem}> 入住 </h6>
      <input className={styles.dateInput} type="date"/>
      <h6>&nbsp; &nbsp;</h6>
      <h6 className={styles.textItem}> 退房 </h6>
      <input className={styles.dateInput} type="date"/>
    </div>
    <div className={styles.barSet}>
      <h6 className={styles.textItem}>大人 </h6>
      <input type="number" min="0" max="50" className={styles.headCountInput}/>
      <h6 className={styles.textItem}> &nbsp;  &nbsp; 孩童 </h6>
      <input type="number" min="0" max="50" className={styles.headCountInput}/>
    </div>
      <Button variant="primary" className={styles.button}>搜尋</Button>{' '}
    
  </div>
  );
}