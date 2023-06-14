import React, {useEffect} from "react";
import MapGis from "../../Component/Map";
import {  Marker, Popup } from 'react-leaflet';
import  {RollbackOutlined } from '@ant-design/icons';
import Chart from "../../Component/Chart";
import Card from "../../Component/Card";
import { Select, DatePicker, Modal } from "antd";
import { useState } from "react";
import hot from "../../assets/hot.png";
import humidity from "../../assets/humidity.png";
import storm from "../../assets/storm.png";
import rain from "../../assets/rainfall.png";
import ChartMultiline from "../../Component/BarChart";
import { Tabs, Carousel } from 'antd';
import axios from "axios";
import moment from "moment";
function Dashboard(props) {
  const [state, setState] = useState({
    province: null,
    kabupaten: null,
    stasiun: null,
    date: null,
    date2: null,
    isModalVisible: false,
    dataPrediksi: null,
    dataForecast: null,
    error: null,
    parameter: null,
  })
  const handlePrediksi = () => {
    axios.get("https://back-end-service-bvlffyleta-uc.a.run.app/api?sheetName=Kab. MalangNew&worksheetName=Data%20Harian%20-%20Table&periods=10&start=2023-03-07&end=2023-03-25")
      .then((res) => {
        setState({ ...state, dataPrediksi: res.data })
      })
      .catch((err) => {
        setState({ ...state, error: err })
      })
  }
  useEffect(() => {
    handlePrediksi()
  }, [])
  const { province, kabupaten, stasiun, date, date2, isModalVisible } = state
  const handleOk = () => {
    setState({ ...state, isModalVisible: !isModalVisible })
  } 
  const handleCancel = () => {
    setState({ ...state, isModalVisible: !isModalVisible })
  }
  const ModalParameters = () => {
    console.log(state.parameter)
    return (
      <Modal title="Basic Modal" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={false}>
        <Chart />
      </Modal>
    )
  }
  const Provinsi = [
    { value: 'Aceh', label: 'Aceh' },
    { value: 'Sumatera Utara', label: 'Sumatera Utara' },
    { value: 'Sumatera Barat', label: 'Sumatera Barat' },
    { value: 'Riau', label: 'Riau' },
    { value: 'Kepulauan Riau', label: 'Kepulauan Riau' },
    { value: 'Jambi', label: 'Jambi' },
  ]

  const Kabupaten = [
    { value: 'Kab. Nunukan', label: 'Kab. Nunukan' },
    { value: 'Kab. Kotawaringin Barat', label: 'Kab. Kotawaringin Barat' },
    { value: 'Kab. Malang', label: 'Kab. Malang' },
    { value: 'Kab. Gresik', label: 'Kab. Gresik' },
    { value: 'Kab. Sidoarjo', label: 'Kab. Sidoarjo' },
  ]

  const Stasiun = [
    { value: 'Stasiun Meterologi Kalimantan Utara', label: 'Stasiun Meterologi Kalimantan Utara' },
    { value: 'Stasiun Meterologi Riau', label: 'Stasiun Meterologi Riau' },
    { value: 'Stasiun Meterologi Sumatera Utara', label: 'Stasiun Meterologi Sumatera Utara' },
  ]
  const listDataParameter = [
    {
      title:"Temperature",
      subtitle:"30°C",
      icon:hot,
      data: state.dataPrediksi?.Data_Result.map((item) => {
        return item?.Prediction?.Temp
      })
    },
    {
      title:"Humidity",
      subtitle:"30%",
      icon: humidity,
      data: state.dataPrediksi?.Data_Result.map((item) => {
        return item?.Prediction?.Humidity
      })
        
    },
    {
      title:"Wind",
      subtitle:"20m/s",
      icon: storm,
      data: state.dataPrediksi?.Data_Result.map((item) => {
        return item?.Prediction?.Wind
      })

    },
    {
      title:"Rainfall",
      subtitle:"2",
      icon: rain,
      data: state.dataPrediksi?.Data_Result.map((item) => {
        return item?.Prediction?.Rainfall
      })
    },
  ]
  const rendah = [];
  const tanggal = [];
  const sedang = [];
  const tinggi = [];
  const sangatTinggi = [];
  const fwi = [];
  fwi.push(state.dataPrediksi?.Data_Result.map((item) => {
    return item.Result?.Category?.fwi
  }))
  console.log(fwi)
  sedang.push(state.dataPrediksi?.Data_Result.map((item) => {
    return item.Result?.Fuzzy[1]
  }))
  tinggi.push(state.dataPrediksi?.Data_Result.map((item) => {
    return item.Result?.Fuzzy[2]
  }))
  sangatTinggi.push(state.dataPrediksi?.Data_Result.map((item) => {
    return item.Result?.Fuzzy[3]
  }))
  tanggal.push(state.dataPrediksi?.Data_Result.map((item) => {
    return moment(item.Date).format("DD MMMM YYYY")
  }))
  rendah.push(state.dataPrediksi?.Data_Result.map((item) => {
    return item.Result?.Fuzzy[0]
  }))
  const handleClickItemParameter = ({ target }) => {
    const data = [];
    if (target.alt === "hot") {
      data.push(listDataParameter[0])
    } 
    setState({
      ...state, isModalVisible: !isModalVisible, parameter: data
    })
  }
  const handleClikToHome = () => {
    window.location.href = "/"
  }
    return(
    <div className="flex w-full bg-[rgb(25,40,65,0.1)]">
        {/* main start */}
        {ModalParameters()}
      <div className="w-[70%]">
          <div className="h-[80px]  pl-[20px] flex items-center  bg-[rgb(194,194,194,0.5)] cursor-pointer" onClick={handleClikToHome}>
          <RollbackOutlined className="bg-[#192841] text-white py-2 px-5 rounded-md"/>
          <h1 className="ml-[20px] text-4xl">Prediksi Kebakaran Hutan di Indonesia</h1>
        </div>
          <Carousel >
            <div className="flex justify-center !important ">
              <Card background="bg-bgCloud" className="snap-center " {...listDataParameter[0]} onClick={handleClickItemParameter.bind(0)} />
              <Card background="bg-bgCloud" className="snap-center " {...listDataParameter[1]} onClick={handleClickItemParameter.bind(1)} />
            </div>
            <div className="flex justify-center !important">
              <Card background="bg-bgCloud" className="snap-center " {...listDataParameter[2]} onClick={handleClickItemParameter.bind(2)} />
              <Card background="bg-bgCloud" className="snap-center " {...listDataParameter[3]} onClick={handleClickItemParameter.bind(3)} />
            </div>
          </Carousel>
        {/* chart and maps */}
          <div className="px-[20px]">
            <Tabs defaultActiveKey="1" centered >
              <Tabs.TabPane tab="Visualisasi Fuzzy" key="1">
              <div className="p-[20px] rounded-md   bg-[rgb(194,194,194,0.5)]">
                <h1 className="text-3xl text-center">Visualisasi Hasil Fuzzy FWI</h1>
                  <ChartMultiline rendah={rendah && rendah} label={tanggal && tanggal} sedang={sedang &&sedang} tinggi={tinggi && tinggi} sangatTinggi={sangatTinggi &&sangatTinggi} />
              </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="FWI" key="2">
                <div className="p-[20px] rounded-md   bg-[rgb(194,194,194,0.5)]">
                  <h1 className="text-3xl text-center">Fire Weather Index</h1>
                  <Chart data={fwi} />
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Maps" key="3">
                <div className="p-[20px] rounded-md  bg-[rgb(194,194,194,0.5)] my-5">
                  <MapGis height="400px" zoom={5}>
                    <Marker position={[2.8410034767493815, 117.38606597564618]}>
                      <Popup>
                        Stasiun Meterologi Kalimantan Utara🔥
                        <h3>Suhu 35</h3>
                        <h3>Kelembapan 50</h3>
                        <h3>Angin 10</h3>
                        <h3>Curah Hukan 2</h3>
                        <span></span>
                      </Popup>
                    </Marker>
                    <Marker position={[0.292714, 101.285209]}>
                      <Popup>
                        <h1>Stasiun Meterologi Riau🔥</h1>
                        <h3>Suhu 35</h3>
                        <h3>Kelembapan 50</h3>
                        <h3>Angin 10</h3>
                        <h3>Curah Hukan 2</h3>

                      </Popup>
                    </Marker>
                  </MapGis>
                </div>
              </Tabs.TabPane>
            </Tabs>
        </div>

      </div>

      {/* main end */}
      {/* sidebar start */}
      <div className="w-[30%] h-screen ">
        <div className=" bg-[rgb(194,194,194,0.5)] shadow-md h-screen  rounded-md ">
          <div className="flex justify-center py-[10px]">
            <img src="/assets/bmkg.png" alt="bmkg" className="w-[50px]" />
            <div className="ml-[20px] flex flex-col">
              <h1 className="text-xl">Stasiun Meterologi</h1>
              <span className="text-sm">Lang -0.343553 Long -0.4353535</span>
            </div>
            
          </div>
          <div className="ml-[20px] flex flex-col mt-5 gap-5">
            <Select
              placeholder="Pilih Provinsi"
              options={Provinsi}
              onChange={(e) => setState({ ...state, province: e })}
              value={province}
            />
            <Select
              placeholder="Pilih Kota/ Kabupaten"
              options={Kabupaten}
              onChange={(e) => setState({ ...state, kabupaten: e })}
              value={kabupaten}
            />
            <Select
              placeholder="Pilih Stasiun"
              options={Stasiun}
                onChange={(e) => setState({ ...state, stasiun: e })}
              value={stasiun}
            />
            <DatePicker.RangePicker 
                onChange={
                  (e) => {
                    setState({ ...state, date: e[0], date2: e[1] })
                  }
                }
              value={[date, date2]}
            />
            <button className="bg-[#192841] text-white py-2 px-5 rounded-md">Prediksi</button>
          </div>
        </div>
      </div>
      {/* sidebar end */}
    </div>
  );
}

export default Dashboard;