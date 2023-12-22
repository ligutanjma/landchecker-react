import {APIProvider, Map, AdvancedMarker, Pin} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { propertiesArr } from './utils';

function Landmark() {
  const [currentPos, setCurrentPos] = useState({
    lat: 0,
    lng: 0,
})
const [markers, ] = useState(propertiesArr)

useEffect(() => {

  const position = {lat:  -37.9373447811622, lng: 145.449895817713
  };
  setCurrentPos(position)
}, [])
  return (
    <div style={{height: "100vh", width: "100%"}}>
      <APIProvider apiKey={'AIzaSyDJLRPq75prR5KiwP34gQM-K9NUenhoNIM'} libraries={['marker']}>
        
      <Map
        zoom={40}
        center={currentPos}
        mapId={'7975d2f5579a2197'}

        
        // disableDefaultUI={true}
      >
        

        {markers.map(property=> (

        <AdvancedMarker
        key={property.property_id}
        position={{
          lat: property.latitude,
          lng: property.longitude
        }}
        title={'AdvancedMarker with customized pin.'}>
        <Pin
          background={'#22ccff'}
          borderColor={'#1e89a1'}
          glyphColor={'#0f677a'}></Pin>
        </AdvancedMarker>
        ))}
      </Map>
      </APIProvider>
    </div>
  );
}

export default Landmark;