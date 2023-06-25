import React from 'react';

import { MapContainer, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';


const MapGis = (props) => {
  const { children, height, zoom } = props;
  // useEffect(() => {
  //   // refresh map ketika ada perubahan data
  //   setTimeout(() => {
  //     document.getElementById('mymaps').style.display = 'none';
  //     document.getElementById('mymaps').style.display = 'block';
  //   }
  //   , 1000);
  // }, [props])
    return (
      <MapContainer center={[-1.989942, 111.619572]} zoom={zoom} scrollWheelZoom={false}  style={{ height: height }} className='maps' id='mymaps'>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>

    );
}

export default MapGis;
MapGis.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  height: PropTypes.string.isRequired,
  zoom: PropTypes.number
};

MapGis.defaultProps = {
  height: '500px',
  zoom: 8
};
