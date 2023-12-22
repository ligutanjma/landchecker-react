import {APIProvider, Map, AdvancedMarker, Pin, Marker} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { propertiesArr } from './utils';
import { Button } from 'antd';

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
    <div style={{height: '100vh', width: '100%'}}>
      <APIProvider apiKey={'AIzaSyDJLRPq75prR5KiwP34gQM-K9NUenhoNIM'} libraries={['marker']}>
        
      <Map
        zoom={11}
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
        
        onClick={() => alert('marker was clicked!')}
        title={'AdvancedMarker with customized pin.'}>
          <Button type='link'>
          <Pin
          background={'#22ccff'}
          borderColor={'#1e89a1'}
          glyphColor={'#0f677a'}
            
          >
            
          </Pin>
          </Button>
        </AdvancedMarker>
        ))}
      </Map>
      </APIProvider>
    </div>
  );
}

export default Landmark;