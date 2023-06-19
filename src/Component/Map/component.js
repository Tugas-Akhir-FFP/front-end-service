import React from 'react';

import { MapContainer, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';


export default class MapGis extends React.Component {
  render() {
    const { children, height, zoom } = this.props;
    return (
      <MapContainer center={[-1.989942, 111.619572]} zoom={zoom} scrollWheelZoom={false}  style={{ height: height }} className='maps'>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>

    );
  }
}

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
