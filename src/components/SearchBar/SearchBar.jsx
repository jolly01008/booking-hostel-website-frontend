// SCSS
import styles from "./SearchBar.module.scss";
import Button from 'react-bootstrap/Button';

export default function SearchBar() {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchSet}>
        <text>地點搜尋 &nbsp;</text>
        <input className={styles.inputText} type="text"></input>
      </div>
      <div className={styles.searchSet}>
        <text>入住日期 &nbsp;</text>
        <input className={styles.Date} type="date"></input>
      </div>
      <div className={styles.searchSet}>
        <text>退房日期 &nbsp;</text>
        <input className={styles.Date} type="date"></input>
      </div>
      <div className={styles.searchSet}>
        <text>成人 </text>
        <input className={styles.headCount} type="number" min="0"></input>
        <text>&nbsp;&nbsp;孩童  </text>
        <input className={styles.headCount} type="number" min="0"></input>
      </div>
      <Button variant="primary" className={styles.button}>搜尋</Button>{' '}

    </div>
  );
}