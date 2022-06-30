import React from "react";

import styles from "./cards.module.css";

const Cards = ({src, title, ...props}) => {
  return (
    <>
        <div className={`col ${styles.col}`}>
          <div className={styles.cards}>
            <img src={src} alt="img" className={styles.cardImage} />
            <div className={styles.cardTitle}>
              <p>{title}</p>
            </div>
          </div>
        </div>
    </>
  );
};

export default Cards;
