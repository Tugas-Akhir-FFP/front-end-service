import React, { Suspense} from "react";
import { Marker, Popup, GeoJSON, FeatureGroup, } from 'react-leaflet';
import  {RollbackOutlined } from '@ant-design/icons';
import { Select, DatePicker, Modal, Slider } from "antd";
import { useState } from "react";
import hot from "../../assets/hot.png";
import humidity from "../../assets/humidity.png";
import storm from "../../assets/storm.png";
import rain from "../../assets/rainfall.png";
import { Tabs, Carousel } from 'antd';
import axios from "axios";
import moment from "moment";
import { gresikdata } from "../../assets/Gresik";
import { dataMalang } from "../../assets/Malang";
import { dataSidoarjo } from "../../assets/Sidoarjo";
import { dataNunukan } from "../../assets/Nunukan";
import { kotawaringinbarat } from "../../assets/KotaWarbar";
import { Spin } from "antd";
import { isEmpty } from "lodash"
import clsx from "clsx";
moment.locale('id')

const Chart = React.lazy(() => import("../../Component/Chart"));
const Chart2 = React.lazy(() => import("../../Component/Chart2"));
const BarChartV2 = React.lazy(() => import("../../Component/BarChartV2"));
const ChartMultiline = React.lazy(() => import("../../Component/BarChart"));
const Card = React.lazy(() => import("../../Component/Card"));
const MapGis = React.lazy(() => import("../../Component/Map"));

function Dashboard(props) {
  const [state, setState] = useState({
    province: null,
    kabupaten: null,
    stasiun: null,
    startDate: null,
    endDate: null,
    isModalVisible: false,
    dataPrediksi: null,
    dataForecast: null,
    error: null,
    parameter: null,
    fetching: false,
    slider: 0,
  })
  const { startDate, endDate, fetching, slider } = state;
  const handlePrediksi = () => {
    setState({ ...state, fetching: true })
    axios.get(`https://back-end-service-bvlffyleta-uc.a.run.app/api?sheetName=${kabupaten}&worksheetName=Data%20Harian%20-%20Table&periods=10&start=${moment(startDate).format("YYYY-MM-DD")}&end=${moment(endDate).add(1,'days').format("YYYY-MM-DD")}`)
      .then((res) => {

        setState({ ...state, dataPrediksi: res.data, fetching: false })
      })
      .catch((err) => {
        setState({ ...state, error: err, fetching: false })
      })
  }
  const handleForecast = () => {
    setState({ ...state, fetching: true })
    axios.get(`https://back-end-service-bvlffyleta-uc.a.run.app/api/forecast?sheetName=${kabupaten}&worksheetName=Data%20Harian%20-%20Table&periods=10&fore=${slider}`)
      .then((res) => {
        setState({ ...state, dataPrediksi: res.data, fetching: false })
      })
      .catch((err) => {
        setState({ ...state, error: err, fetching: false }) 
      })
  }
  const { province, kabupaten, stasiun,  isModalVisible } = state
  const handleOk = () => {
    setState({ ...state, isModalVisible: !isModalVisible })
  } 
  const handleCancel = () => {
    setState({ ...state, isModalVisible: !isModalVisible })
  }
  const ModalParameters = () => {
    return (
      <Suspense fallback={<Spin />}>
      <Modal title="Parameter" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={false}>
        <Chart data={state.parameter} tanggal={tanggal[0]}/>
        </Modal>
      </Suspense>
    )
  }
  const Provinsi = [
    { value: 0, label: 'Kalimantan Utara' },
    { value: 1, label: 'Kalimantan Tengah' },
    { value: 2, label: 'Jawa Tengah' },
    { value: 3, label: 'Jawa Timur' },
  ]
  

  const Kabupaten = [
    { value: 'Kab. Nunukan', label: 'Kab. Nunukan', id_province: 0 , id_kabupaten: 0},
    { value: 'kotawaringinbarat', label: 'Kab. Kotawaringin Barat', id_province: 1, id_kabupaten: 1 },
    { value: 'Kab. MalangNew', label: 'Kab. Malang' , id_province: 2, id_kabupaten: 2},
    { value: 'Kab. GresikNew', label: 'Kab. Gresik' , id_province: 3, id_kabupaten: 3},
    { value: 'Kab. SidoarjoNew', label: 'Kab. Sidoarjo' , id_province: 3, id_kabupaten: 4},
  ]
  let filterKabupaten = Kabupaten.filter((item) => {
    return item.id_province === province
  })
  
  const Stasiun = [
    { value: 'Stasiun Meterologi Nunukan', label: 'Stasiun Meterologi Nunukan', nama_kabupaten: "Kab. Nunukan" },
    { value: 'Stasiun Meterologi Iskandar', label: 'Stasiun Meterologi Iskandar', nama_kabupaten: "kotawaringinbarat"},
    { value: 'Stasiun Klimatologi Jawa Timur', label: 'Stasiun Klimatologi Jawa Timur', 
      nama_kabupaten: "Kab. MalangNew" },
    { value: 'Stasiun Meteorologi Sangkapura', label: 'Stasiun Meteorologi Sangkapura', 
    nama_kabupaten: "Kab. GresikNew" },
    { value: 'Stasiun Meteorologi Juanda', label: 'Stasiun Meteorologi Juanda', nama_kabupaten: "Kab. SidoarjoNew" },
  ]

  let filterStasiun = Stasiun.filter((item) => {
    return item.nama_kabupaten === kabupaten
  })
  let tempPrediksi = []
  let humPrediksi = []
  let windPrediksi = []
  let rainPrediksi = []
  tempPrediksi = state.dataPrediksi?.Data_Result?.map((item) => {
    return item?.Prediction?.Temp
  })
  humPrediksi = state.dataPrediksi?.Data_Result?.map((item) => {
    return item?.Prediction?.Humidity
  })
  windPrediksi = state.dataPrediksi?.Data_Result?.map((item) => {
    return item?.Prediction?.Wind
  })
  rainPrediksi = state.dataPrediksi?.Data_Result?.map((item) => {
    return item?.Prediction?.Rainfall
  })
  const listDataParameter = [
    {
      title:"Temperature",
      subtitle:!isEmpty(tempPrediksi)&& `${tempPrediksi[tempPrediksi?.length - 1]}°C` ,
      icon:hot,
      data: tempPrediksi
    },
    {
      title:"Humidity",
      subtitle:!isEmpty(humPrediksi)&& `${humPrediksi[humPrediksi?.length - 1]}%` ,
      icon: humidity,
      data: humPrediksi
        
    },
    {
      title:"Wind",
      subtitle:!isEmpty(windPrediksi)&& `${windPrediksi[windPrediksi?.length - 1]}m/s` ,
      icon: storm,
      data: windPrediksi

    },
    {
      title:"Rainfall",
      subtitle:!isEmpty(rainPrediksi)&& `${rainPrediksi[rainPrediksi?.length - 1]}mm` ,
      icon: rain,
      data: rainPrediksi
    },
  ]
  const rendah = [];
  const tanggal = [];
  const sedang = [];
  const tinggi = [];
  const sangatTinggi = [];
  const fwi = [];
  const bui = [];
  const dc = [];
  const isi = [];
  const dmc = [];
  const ffmc = [];
  const error = state.dataPrediksi?.Prediksi_Error
  ffmc.push(state.dataPrediksi?.Data_Result.map((item) => {
    return item.Result?.Category?.ffmc
  }))
  bui.push(state.dataPrediksi?.Data_Result.map((item) => {
    return item.Result?.Category?.bui
  }))
  dc.push(state.dataPrediksi?.Data_Result.map((item) => {
    return item.Result?.Category?.dc
  }))
  isi.push(state.dataPrediksi?.Data_Result.map((item) => {
    return item.Result?.Category?.isi
  }))
  dmc.push(state.dataPrediksi?.Data_Result.map((item) => {
    return item.Result?.Category?.dmc
  }))

  fwi.push(state.dataPrediksi?.Data_Result.map((item) => {
    return item.Result?.Category?.fwi
  }))
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

  const handleClickItemParameter = ({ data }) => {
    setState({
      ...state, isModalVisible: !isModalVisible, parameter: data
    })
  }
  const handleClikToHome = () => {
    window.location.href = "/"
  }
  const handleChangeDate = (dates, dateStrings) => {
    setState({
      ...state, startDate: dateStrings[0], endDate: dateStrings[1]
    })
  }

  const renderPoligon = () => {
    let className = ""
    if (sangatTinggi[0]?.length > 0 && Math.max(...sangatTinggi[0]) > 0) {
      className = "merah"
    } else if (tinggi[0]?.length > 0 && Math.max(...tinggi[0]) > 0) {
      className = "kuning"
    } else if (sedang[0]?.length > 0 && Math.max(...sedang[0]) > 0) {
      className = "hijau"
    } else if (rendah[0]?.length > 0 && Math.max(...rendah[0]) > 0) {
      className = "biru"
    }
    switch (kabupaten) {
      case "Kab. Nunukan":
        return (
          <GeoJSON data={dataNunukan} className={clsx('biru',{[className]: className})} />
        )
      case "kotawaringinbarat":
        return (
          <GeoJSON data={kotawaringinbarat} className={clsx('biru',{[className]: className})} />
        )
      case "Kab. MalangNew":
        return (
          <GeoJSON data={dataMalang} className={clsx('biru',{[className]: className})} />
        )
      case "Kab. GresikNew":
        return (
          <GeoJSON data={gresikdata} className={clsx('biru',{[className]: className})} />
        )
      case "Kab. SidoarjoNew":
        return (
          <GeoJSON data={dataSidoarjo} className={clsx('biru',{[className]: className})} />
        
        )
      default:
        break;
    }
  }

  const renderMarker = () => {
    let status = ""
    const fwiTerbesar = !isEmpty(fwi[0]) && Math.max(...fwi[0])
    
    const date = fwiTerbesar && tanggal[0][fwi[0].indexOf(fwiTerbesar)]
    const buiTerbesar = !isEmpty(bui[0]) && bui[0][fwi[0].indexOf(fwiTerbesar)]
    const dcTerbesar = !isEmpty(dc[0]) && dc[0][fwi[0].indexOf(fwiTerbesar)]
    const isiTerbesar = !isEmpty(isi[0]) && isi[0][fwi[0].indexOf(fwiTerbesar)]
    const dmcTerbesar = !isEmpty(dmc[0]) && dmc[0][fwi[0].indexOf(fwiTerbesar)]
    const ffmcTerbesar = !isEmpty(ffmc[0]) && ffmc[0][fwi[0].indexOf(fwiTerbesar)]
    switch (kabupaten) {
      case "Kab. Nunukan":
        return (
          <Marker position={[4.44356592231071, 115.71489159402185]} >
            <Popup>
              <span>Stasiun Meteorologi Nunukan</span>
              <hr />
              <span>Status: {status}</span>
              <br />
              <span>Tanggal: {date}</span>
              <br />
              <span>FWI: {fwiTerbesar}</span>
              <br />
              <span>BUI: {buiTerbesar}</span>
              <br />
              <span>DC: {dcTerbesar}</span>
              <br />
              <span>ISI: {isiTerbesar}</span>
              <br />
              <span>DMC: {dmcTerbesar}</span>
              <br />
              <span>FFMC:{ffmcTerbesar}</span>
            </Popup>
          </Marker>
        )
      case "kotawaringinbarat":
        return (
          <Marker position={[-2.75, 111.5]}  >
            <Popup>
              <span>Stasiun Meteorologi Kotawaringin Barat</span>
              <hr />
              <span>Status: {status}</span>
              <br />
              <span>Tanggal: {date}</span>
              <br />
              <span>FWI: {fwiTerbesar}</span>
              <br />
              <span>BUI: {buiTerbesar}</span>
              <br />
              <span>DC: {dcTerbesar}</span>
              <br />
              <span>ISI: {isiTerbesar}</span>
              <br />
              <span>DMC: {dmcTerbesar}</span>
              <br />
              <span>FFMC:{ffmcTerbesar}</span>
            </Popup>
          </Marker>
        )
      case "Kab. MalangNew":
        return (
          <Marker position={[-7.901117, 112.597553]}  >
            <Popup>
              <span>Stasiun Meteorologi Malang</span>
              <hr />
              <span>Status: {status}</span>
              <br />
              <span>Tanggal: {date}</span>
              <br />
              <span>FWI: {fwiTerbesar}</span>
              <br />
              <span>BUI: {buiTerbesar}</span>
              <br />
              <span>DC: {dcTerbesar}</span>
              <br />
              <span>ISI: {isiTerbesar}</span>
              <br />
              <span>DMC: {dmcTerbesar}</span>
              <br />
              <span>FFMC:{ffmcTerbesar}</span>
            </Popup>
          </Marker>

        )
      case "Kab. GresikNew":
        return (
          <Marker position={[-7.25, 112.75]}  >
            <Popup>
              <span>Stasiun Meteorologi Gresik</span>
              <hr />
              <span>Status: {status}</span>
              <br />
              <span>Tanggal: {date}</span>
              <br />
              <span>FWI: {fwiTerbesar}</span>
              <br />
              <span>BUI: {buiTerbesar}</span>
              <br />
              <span>DC: {dcTerbesar}</span>
              <br />
              <span>ISI: {isiTerbesar}</span>
              <br />
              <span>DMC: {dmcTerbesar}</span>
              <br />
              <span>FFMC:{ffmcTerbesar}</span>
            </Popup>
          </Marker>

        )
      case "Kab. SidoarjoNew":
        return (
          <Marker position={[-7.372563565, 112.78204515]} >
            <Popup>
              <span>Stasiun Meteorologi Sidoarjo</span>
              <hr />
              <span>Status: {status}</span>
              <br />
              <span>Tanggal: {date}</span>
              <br />
              <span>FWI: {fwiTerbesar}</span>
              <br />
              <span>BUI: {buiTerbesar}</span>
              <br />
              <span>DC: {dcTerbesar}</span>
              <br />
              <span>ISI: {isiTerbesar}</span>
              <br />
              <span>DMC: {dmcTerbesar}</span>
              <br />
              <span>FFMC:{ffmcTerbesar}</span>
            </Popup>
          </Marker>
        )
      default:
        break;
    }
  }
  let disabled = province === null || kabupaten === null || stasiun === null || startDate === null || endDate === null
  let disabledForcast = province === null || kabupaten === null || stasiun === null || state.slider === 0

  const handleDisableDate = (date) => {
    // disable jika start lebih besar dari tanggal 18 mei 2023 atau end lebih besar dari tanggal 18 mei 2023
    return date > moment("2023-05-18") || date < moment("2020-01-01")
  }
  const handleChangeSlider = (value) => {
    setState({
      ...state,
      slider: value
    })
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
          <Suspense fallback={<div>Loading...</div>}>
          <Carousel >
            <div className="flex justify-center !important ">
              <Card background="bg-bgCloud" className="snap-center " {...listDataParameter[0]} onClick={handleClickItemParameter.bind(null,listDataParameter[0])} />
              <Card background="bg-bgCloud" className="snap-center " {...listDataParameter[1]} onClick={handleClickItemParameter.bind(null,listDataParameter[1])} />
            </div>
            <div className="flex justify-center !important">
              <Card background="bg-bgCloud" className="snap-center " {...listDataParameter[2]} onClick={handleClickItemParameter.bind(null,listDataParameter[2])} />
              <Card background="bg-bgCloud" className="snap-center " {...listDataParameter[3]} onClick={handleClickItemParameter.bind(null,listDataParameter[3])} />
            </div>
            </Carousel>
          </Suspense>
        {/* chart and maps */}
          <div className="px-[20px]">
            <Tabs defaultActiveKey="1" centered >
              <Tabs.TabPane tab="Visualisasi Fuzzy" key="1">
              <div className="p-[20px] rounded-md   bg-[rgb(194,194,194,0.5)]">
                  <h1 className="text-3xl text-center">Visualisasi Hasil Fuzzy FWI</h1>
                  <Suspense fallback={<div>Loading...</div>}>
                    <ChartMultiline rendah={rendah && rendah} label={tanggal && tanggal} sedang={sedang && sedang} tinggi={tinggi && tinggi} sangatTinggi={sangatTinggi && sangatTinggi} />
                  </Suspense>
              </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="FWI" key="2">
                <div className="p-[20px] rounded-md   bg-[rgb(194,194,194,0.5)]">
                  <h1 className="text-3xl text-center">Fire Weather Index</h1>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Chart2 data={fwi[0]} tanggal={tanggal[0]} id="mychart2" />
                  </Suspense>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Maps" key="3">
                <div className="p-[20px] rounded-md  bg-[rgb(194,194,194,0.5)] my-5">
                  <Suspense key={state.dataPrediksi} fallback={<div>Loading...</div>}>
                    <MapGis height="400px" zoom={5}>
                    <FeatureGroup>
                      {
                        (kabupaten && !fetching) && renderPoligon()
                      }
                      {
                          (kabupaten && !fetching) && renderMarker()
                      }
                      
                    </FeatureGroup>
                    </MapGis>
                  </Suspense>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Error" key="4">
                <div className="p-[20px] rounded-md  bg-[rgb(194,194,194,0.5)] my-5">
                  <Suspense fallback={<div>Loading...</div>}>
                    <BarChartV2 id="mychart3" data={error} />
                    </Suspense>
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
                <h1 className="text-xl">{stasiun}</h1>
              <span className="text-sm">Lang -0.343553 Long -0.4353535</span>
            </div>
            
          </div>
            <Tabs defaultActiveKey="1" centered >
              <Tabs.TabPane tab="Prediksi" key="1">
            <div className="ml-[20px] flex flex-col mt-5 gap-5">
                <Select
                placeholder="Pilih Provinsi"
                options={Provinsi}
                onChange={(e) => setState({ ...state, province: e, kabupaten:null, stasiun:null, dataPrediksi:null, startDate:null, endDate:null })}
                value={province}
                />
              <Select
                placeholder="Pilih Kota/ Kabupaten"
                options={filterKabupaten} 
                onChange={(e) => setState({ ...state, kabupaten: e, stasiun: null, dataPrediksi: null, startDate: null, endDate: null })}
                value={kabupaten}
                />
              <Select
                placeholder="Pilih Stasiun"
                options={filterStasiun}
                onChange={(e) => setState({ ...state, stasiun: e, dataPrediksi: null, startDate: null, endDate: null })}
                value={stasiun}
              />
              <DatePicker.RangePicker 
                onChange={handleChangeDate}
                startDate={startDate}
                endDate={endDate}
                disabledDate={handleDisableDate}
              />
              <button className={clsx('bg-[#192841] text-white py-2 px-5 rounded-md', disabled && 'bg-gray-400 cursor-not-allowed')}
                disabled={disabled}
                onClick={handlePrediksi}
              >{
                fetching ? <Spin /> : 'Prediksi'
                    }</button>
          </div>

                </Tabs.TabPane >
              <Tabs.TabPane tab="Forecast" key="2">
                <div className="ml-[20px] flex flex-col mt-5 gap-5">

                <Select
                  placeholder="Pilih Provinsi"
                  options={Provinsi}
                  onChange={(e) => setState({ ...state, province: e, kabupaten: null, stasiun: null, dataPrediksi: null, startDate: null, endDate: null })}
                  value={province}
                />
                <Select
                  placeholder="Pilih Kota/ Kabupaten"
                  options={filterKabupaten}
                  onChange={(e) => setState({ ...state, kabupaten: e, stasiun: null, dataPrediksi: null, startDate: null, endDate: null })}
                  value={kabupaten}
                />
                <Select
                  placeholder="Pilih Stasiun"
                  options={filterStasiun}
                  onChange={(e) => setState({ ...state, stasiun: e, dataPrediksi: null, startDate: null, endDate: null })}
                  value={stasiun}
                />
                  <Slider min={0} max={100} onChange={handleChangeSlider} value={slider} />
                  <button className={clsx('bg-[#192841] text-white py-2 px-5 rounded-md', disabledForcast && 'bg-gray-400 cursor-not-allowed')}
                    disabled={disabledForcast}
                    onClick={handleForecast}
                  >{
                      fetching ? <Spin /> : 'Forecast'
                    }</button>
          </div>

                </Tabs.TabPane>
              </Tabs>
        </div>
      </div>
      {/* sidebar end */}
    </div>
  );
}

export default Dashboard;