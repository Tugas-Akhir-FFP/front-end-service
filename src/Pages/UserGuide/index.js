import React, { useEffect, useState } from "react";
import clsx from "clsx";
import capture1 from "../../assets/capture1.jpg"
import capture2 from "../../assets/capture2.jpg"
import capture3 from "../../assets/capture3.jpg"
import capture4 from "../../assets/capture4.jpg"

function Component() {
  const [current, setCurrent] = useState(0);
  const [isNext, setIsNext] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsNext(true)
    }, 0)
  }, [current])
  const handleNext = () => {
    setIsNext(false)
    if (current === UserGuide.length - 1) {
      window.location.href = "/dashboard"
    }else {
      setTimeout(() => {
        setCurrent(current + 1)
      }, 1000);
    }
  }

  const handlePrev = () => {
    setIsNext(false)

    setCurrent(current - 1)
  }

  const UserGuide = [
    {
      title: "Pilih provinsi, kabupaten, dan stasiun",
      description: "Pilih provinsi, kabupaten, dan stasiun yang ingin anda lihat datanya",
      img: capture1
    },
    {
      title: "Klik tombol 'Prediksi'",
      description: "Klik tombol 'Prediksi' untuk melihat prediksi",
      img: capture2
    },
    {
      title: 'Klik gambar parameter',
      description: 'Klik gambar parameter untuk melihat detail prediksi',
      img: capture3
    },
    {
      title: 'Klik Tabs',
      description: 'Klik Tabs dibawah ini untuk melihat hasil lainnya',
      img: capture4
    }
  ]
  return (
    <div className=" flex w-screen h-screen bg-white justify-center items-center bg-asap bg-cover bg-no-repeat">
      <div>
        <div className={clsx({
          "opacity-0 translate-x-[-100px] transition-all duration-1000": !isNext,
          "opacity-100 translate-x-0 transition-all duration-500": isNext,
        })}>
          {
          UserGuide[current] &&
            <div className="h-[500px] w-[500px] shadow-md rounded-[10px] flex flex-col justify-center bg-gradient-to-r from-[rgba(25,40,65,0.8)] to-[rgba(25,40,65,0.5)]">
                
              <h1 className="text-2xl font-bold text-center text-white">{UserGuide[current].title}</h1>
                <p className="text-sm text-center text-white">{UserGuide[current].description}</p>
                <div className="flex justify-center">
                  <img src={UserGuide[current].img} alt="capture" className="w-[300px] " />
                </div>
          </div>
          }
        </div>
        <div className="flex justify-between w-[500px] mt-[20px]">
          <button className="bg-[#192841] text-white py-2 px-5 rounded-md" onClick={handlePrev}>Sebelumnya</button>
          <button className="bg-[#192841] text-white py-2 px-5 rounded-md" onClick={handleNext}>Selanjutnya</button>
        </div>
      </div>
      
    </div>
  )
}

export default Component