import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footer}>
        <div>
        <h1>EAT, COOK, REPEAT</h1>
        <h6>Share your best recipe by uploading here !</h6>
        <p>Product &nbsp;&nbsp;&nbsp; Company &nbsp;&nbsp;&nbsp; Learn more &nbsp;&nbsp;&nbsp; Get in touch</p>
        </div>
        <p className={styles.copyright}>© Arkademy</p>
      </div>
    </div>
  );
};

export default Footer;
