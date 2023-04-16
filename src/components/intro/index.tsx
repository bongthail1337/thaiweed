import 'maplibre-gl/dist/maplibre-gl.css';

import SC from '@emotion/styled';
import maplibregl from 'maplibre-gl';
import React from 'react';
import Map, {GeolocateControl, Marker, NavigationControl, Popup, ScaleControl} from 'react-map-gl';
import {Element} from 'react-scroll';

import Pin from './pin';

// import {maxDevice, minDevice, theme} from '../styles';
// import {Label, Section,Text} from './common';

const Container = SC.div`
  overflow: hidden;
`;

export const Intro = (props: any) => {
  const [popupInfo, setPopupInfo] = React.useState(null);
  
  const pins = React.useMemo(
    () =>
      (props?.points || []).map((point) => (
        <Marker
          key={`marker-${point.id}`}
          longitude={+point.lng}
          latitude={+point.lat}
          anchor="bottom"
          onClick={e => {
            e.originalEvent.stopPropagation();
            setPopupInfo(point);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );

  return (
    <Element name="intro">
      <Container>
      <Map mapLib={maplibregl} 
          initialViewState={{
            longitude: 100.4150387,
            latitude: 13.9810801,
            zoom: 8,
            bearing: 0,
            pitch: 0
          }}
          style={{width: "100%", height: "100vh"}}
          mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=KzCgKOkb2nap54b0Fv2L"
        >
          <GeolocateControl position="bottom-right" />
          <NavigationControl position="bottom-right" />
          <ScaleControl />
          
          {pins}

          {popupInfo && (
            <Popup
              anchor="top"
              longitude={+popupInfo.lng}
              latitude={+popupInfo.lat}
              onClose={() => setPopupInfo(null)}
            >
              <div>
                {popupInfo.city}, {popupInfo.name}
              </div>
            </Popup>
          )}
        </Map>
      </Container>
    </Element>
  );
}
