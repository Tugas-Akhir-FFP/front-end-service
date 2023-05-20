import React from 'react'
import { url } from "inspector"
import style from './about.module.scss'
import { Header } from "next/dist/lib/load-custom-routes"

function about (){
    
    return (
        <>
        <body>
            <div className={style.navbar}>
                <header>
                    <img className={style.logo} src="/pict/FPP.png" alt="" />
                    <a className={style.button} href="/">Tentang Kami</a>
                    <h1>Prediction and Forecasting for Forest Fire in Indonesia</h1>
                </header>
            </div>
            <div>
                <img className={style.bg} src="/pict/hutan.jpg" alt="" />
            </div>
            <div className={style.footer}>
                <div className={style.telyu}>
                    <h1>Developed By:</h1>
                    <img src="/pict/telyu.png" alt="" />
                </div>
                <div className={style.bmkg}>
                    <h1>Powered By:</h1>
                    <img src="/pict/bmkg.png" alt="" />
                </div>
                <div className={style.kontak}>
                    <h2>Kontak Kami</h2>
                    <p>Forest Fire Prediction</p>
                    <p>Telp : (021) 8450505 </p>
                    <p>Email : ffpindonesia@gmail.com</p>
                </div>
            </div>
        </body>
        </>
    )
}

export default about