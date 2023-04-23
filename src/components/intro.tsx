import 'maplibre-gl/dist/maplibre-gl.css';

import SC from '@emotion/styled';
import maplibregl from 'maplibre-gl';
import React from 'react';
import Map, {GeolocateControl, Marker, NavigationControl, Popup, ScaleControl} from 'react-map-gl';
import {Element} from 'react-scroll';

import {Icon} from './icon';

// import {maxDevice, minDevice, theme} from '../styles';
// import {Label, Section,Text} from './common';

const Container = SC.div`
  overflow: hidden;
`;

const defaultCoordinate = {

};

export const Intro = (props: any) => {
  const [activeMarker, setActiveMarker ] = React.useState(null);
  const [popupInfo, setPopupInfo] = React.useState(null);

  return (
    <Element name="intro">
      <Container>
      <Map mapLib={maplibregl}
          initialViewState={{
            longitude: 100.4150387,
            latitude: 13.9810801,
            zoom: 10,
            bearing: 0,
            pitch: 0
          }}
          minZoom={9}
          maxZoom={23}
          style={{width: "100%", height: "100vh"}}
          mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=KzCgKOkb2nap54b0Fv2L"
        >
          <GeolocateControl position="bottom-right" />
          <NavigationControl position="bottom-right" />
          <ScaleControl />
          
          {(props?.points || []).map((point) => {
            const plng = popupInfo?.lng;
            const plat = popupInfo?.lat;
            const mlng = activeMarker?.lng;
            const mlat = activeMarker?.lat;
            const isEqual = +point?.lat === +plat && +point?.lng === +plng;
            const isEqualMarker = +point?.lat === +mlat && +point?.lng === +mlng;
            const markerColor = isEqualMarker ? 'light green' : 'green';
            return (
              <div
                key={`marker-${point.id}`}
                onMouseEnter={() => {setActiveMarker(point);}}
                onMouseLeave={() => {setActiveMarker(null);}}
                >
                <Marker
                  longitude={+point.lng}
                  latitude={+point.lat}
                  anchor="bottom"
                  onClick={e => {
                    e.originalEvent.stopPropagation();
                    setPopupInfo(point);
                  }}
                >
                  <Icon name="weed" size={40} color={isEqual ? 'red' : markerColor}/>
                </Marker>
              </div>
            );
          })}

          {activeMarker && (
            <Popup
              anchor="top"
              longitude={+activeMarker.lng}
              latitude={+activeMarker.lat}
              // onClose={() => setPopupInfo(null)}
            >
              <div>
                {activeMarker.city}, {activeMarker.name}
              </div>
            </Popup>
          )}
        </Map>
      </Container>
    </Element>
  );
}
