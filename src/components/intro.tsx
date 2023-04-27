import 'maplibre-gl/dist/maplibre-gl.css';

import SC from '@emotion/styled';
import maplibregl from 'maplibre-gl';
import React from 'react';
import Map, {GeolocateControl, Marker, NavigationControl, Popup, ScaleControl} from 'react-map-gl';
import {Element} from 'react-scroll';

import {Icon} from './icon';
import {PopupDetails} from './popupDetails';

// import {maxDevice, minDevice, theme} from '../styles';
// import {Label, Section,Text} from './common';

const Container = SC.div`
  overflow: hidden;
`;

const SCPopup = SC(Popup)`
  opacity: 0.9;
`;

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
            <SCPopup
              anchor="top"
              longitude={+activeMarker.lng}
              latitude={+activeMarker.lat}
              closeButton={false}
              // onClose={() => setPopupInfo(null)}
            >
              <PopupDetails data={activeMarker} />
            </SCPopup>
          )}

          {/* <div class="leaflet-pane leaflet-tooltip-pane">
            <div class="leaflet-tooltip leaflet-zoom-animated leaflet-tooltip-left" role="tooltip" id="leaflet-tooltip-1447" style="opacity: 0.9; transform: translate3d(652px, 427px, 0px);">
              <div style="width: 300px; padding: 5px; min-height: 85px;">
                <div class="FeaturedImage_featuredImage__zpw93" style="width: 75px; height: 75px; float: left; border-radius: 10px;">
                  <div>
                    <div class="LazyLoad is-visible">
                      <img src="https://i.weed.th/ii/527893a5e9cba71f8ad79fc43f067e65/150x150" width="100%" style="cursor: inherit; background-color: transparent; border-radius: 7px; filter: unset; z-index: 1; position: absolute;">
                    </div>
                  </div>
                  <svg viewBox="0 0 100 100"></svg>
                </div>
                      <div style="padding-left: 10px; float: left; width: 200px;">
                        <div style="overflow: hidden;">
                          <div style="color: rgb(102, 102, 102);">
                            <img height="20" src="" alt="rating" style="transform: translateY(7px);">
                            5.0 (14 reviews)
                          </div>
                        </div>
                        <span style="white-space: break-spaces; font-weight: bold; font-size: 16px;">CANNABIS BANGKOK SUDYOD GANJA</span>
                      </div>
                      <div style="clear: both;">
                        <div style="font-size: 10px; font-weight: bold; padding-bottom: 5px; padding-top: 10px;">RECENT PRODUCTS PREVIEW</div>
                        <div style="height: 40px; cursor: pointer;">
                          <div style="display: inline-block; font-weight: bold; float: left; padding-top: 5px; width: 35px; padding-left: 5px; font-size: 12px; transform: translateX(-7px); text-align: center;">
                            <div style="font-size: 10px; margin-bottom: 5px; margin-top: 5px; opacity: 0.8;">฿900/g
                          </div>
                        </div>
                        <div class="FeaturedImage_featuredImage__zpw93" style="width: 30px; height: 30px; float: left; border-radius: 10px;">
                          <div>
                            <div class="LazyLoad is-visible">
                              <img src="https://i.weed.th/ii/f0eebba953841916ea3df863766535c4/80x80" width="100%" style="cursor: inherit; border-radius: 7px; filter: unset; z-index: 1; position: absolute; background-color: rgb(255, 255, 255);">
                            </div>
                          </div>
                          <svg viewBox="0 0 100 100"></svg>
                        </div>
                        <div style="float: left; margin-top: 0px;">
                          <a href="/shop/ae191da3-b486-4641-9976-2ddc83981d4f" style="font-weight: bold; display: block; padding-left: 5px; opacity: 0.9; padding-top: 0px; max-width: 210px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Lemon cherry </a>
                          <div style="font-size: 10px; padding-left: 5px; max-width: 210px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            AA - <span style="font-size: 10px; color: rgb(68, 68, 68);">24% THC - 100% INDICA</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
        </Map>
      </Container>
    </Element>
  );
}
