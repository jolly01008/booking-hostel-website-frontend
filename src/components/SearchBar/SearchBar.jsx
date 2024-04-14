// SCSS
import styles from "./SearchBar.module.scss";
import Button from 'react-bootstrap/Button';

export default function SearchBar() {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchSet}>
        <h6>地點搜尋 &nbsp;</h6>
        <input className={styles.inputText} type="text"></input>
      </div>
      <div className={styles.searchSet}>
        <h6>入住日期 &nbsp;</h6>
        <input className={styles.Date} type="date"></input>
      </div>
      <div className={styles.searchSet}>
        <h6>退房日期 &nbsp;</h6>
        <input className={styles.Date} type="date"></input>
      </div>
      <div className={styles.searchSet}>
        <h6>成人 </h6>
        <input className={styles.headCount} type="number" min="0"></input>
        <h6>&nbsp;&nbsp;孩童  </h6>
        <input className={styles.headCount} type="number" min="0"></input>
      </div>
      <Button variant="primary" className={styles.button}>搜尋</Button>{' '}

    </div>
  );
}