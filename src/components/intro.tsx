import 'maplibre-gl/dist/maplibre-gl.css';

import SC from '@emotion/styled';
import maplibregl from 'maplibre-gl';
import Link from 'next/link';
import React from 'react';
import Map, {GeolocateControl, Marker, NavigationControl, ScaleControl} from 'react-map-gl';
import {Element} from 'react-scroll';

import {Icon} from './icon';
import {Details} from './shop/details';
import {PopupDetails} from './shop/popupDetails';

// import {maxDevice, minDevice, theme} from '../styles';
// import {Label, Section,Text} from './common';

const Container = SC.div`
  overflow: hidden;
`;

export const Intro = (props: any) => {
  const [hoverMarker, setHoverMarker ] = React.useState(null);
  const [currentShop, setCurrentShop] = React.useState(props?.initShop);

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
            const plng = currentShop?.lng;
            const plat = currentShop?.lat;
            const mlng = hoverMarker?.lng;
            const mlat = hoverMarker?.lat;
            const isEqualShop = +point?.lat === +plat && +point?.lng === +plng;
            const isEqualMarker = +point?.lat === +mlat && +point?.lng === +mlng;
            const markerColor = isEqualMarker ? 'light green' : 'green';
            return (
              <div
                key={`marker-${point.id}`}
                onMouseEnter={() => {setHoverMarker(point);}}
                onMouseLeave={() => {setHoverMarker(null);}}
                >
                <Link href={`/shop/${point.id}`}>
                  <Marker
                    longitude={+point.lng}
                    latitude={+point.lat}
                    anchor="bottom"
                    onClick={e => {
                      e.originalEvent.stopPropagation();
                      setCurrentShop(point);
                    }}
                  >
                    <Icon name="weed" size={40} color={isEqualShop ? 'red' : markerColor}/>
                  </Marker>
                </Link>
              </div>
            );
          })}

          {hoverMarker && <PopupDetails data={hoverMarker} />}
        </Map>
        {currentShop && <Details data={currentShop} />}
      </Container>
    </Element>
  );
}
