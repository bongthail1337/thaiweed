import 'maplibre-gl/dist/maplibre-gl.css';

import SC from '@emotion/styled';
import maplibregl from 'maplibre-gl';
import React from 'react';
import Map, {NavigationControl} from 'react-map-gl';
import {Element} from 'react-scroll';

// import {maxDevice, minDevice, theme} from '../styles';
// import {Label, Section,Text} from './common';

const Container = SC.div`
  overflow: hidden;
`;

export const Intro = props => (
  <Element name="intro">
    <Container>
    <Map mapLib={maplibregl} 
        initialViewState={{
          longitude: 100.4150387,
          latitude: 13.9810801,
          zoom: 8
        }}
        style={{width: "100%", height: "100vh"}}
        mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=KzCgKOkb2nap54b0Fv2L"
      >
        <NavigationControl position="bottom-right" />
      </Map>
    </Container>
  </Element>
);
