import { Card } from 'react-bootstrap';

// SCSS
import styles from "./HostelCard.module.scss";

export default function HostelCard({
   picture ,
   name ,
   address,
   price
  }) {
  return (
    <div>
    <Card style={{ width: '20rem' }} className="mt-5 mx-3">
      <Card.Img variant="top" src={picture} />
      <Card.Body>
        <h5 className={styles.hostelTitle}>{name}</h5>
        <h6 className={styles.address}>{address}</h6>
        <h6 className={styles.price}>起價: ${price} </h6>
      </Card.Body>
    </Card>
    </div>
  );
}