/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import styles from './styles.module.css';
import telu from '../../assets/telu.png';
import bmkg from '../../assets/bmkg.png';
export default function Counter() {
  const onClick = () => {
    // to /dashboard
    window.location.href = "/userguide";

  }
  return (
    <div className={styles.root}>
      <h1 className={styles.nav}>
        <h1>Forest Fire Prediction In Indonesia</h1>
      </h1>
      <div className={styles.container}>
        <h1>Forests are home to over 80 percent of land
          animals and plants and cover 31 percent of the world's total land area</h1>
        <button className={styles.button} onClick={onClick}>Mulai Sekarang</button>
      </div>
      <div className={styles.footer}>
        {/* // <div className={styles.left}>
        //   <div className={styles.telu}>
        //     <span>Developed by:</span>
        //     <div className='bg-white rounded-full w-[70px] h-[70px] flex justify-center items-center'>
        //       <img src={telu} />
        //       </div>
        //   </div>
        //   <div className={styles.bmkg}>
        //     <span>Supported by:</span>
        //     <div className='bg-white rounded-full w-[70px] h-[70px] flex justify-center items-center'>
        //       <img src={bmkg} />
        //       </div>
        //   </div>
        // </div> */}
        <div className={styles.right}>
          <div className={styles.contact}>
            <span>Contact Us</span>
            <span>email: forestfire@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}

