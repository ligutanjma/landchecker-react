import React from 'react'
import { APIProvider, AdvancedMarker, Map, Pin } from '@vis.gl/react-google-maps'
import { Coords } from '../Landmark'
import { Landmark } from '../../redux/landmark/landmark.slice'

interface MapProps {
  center: Coords
  data: Landmark[]
  onClickMarker?: (data: Landmark) => void
  zoom?: number | undefined
}
function MapContainer({ center, zoom = 11, data, onClickMarker }: MapProps) {
  return (
    <APIProvider apiKey={'AIzaSyDJLRPq75prR5KiwP34gQM-K9NUenhoNIM'} libraries={['marker']}>
      <Map zoom={zoom} center={center} mapId={'7975d2f5579a2197'} disableDefaultUI={true}>
        {data.map((property) => {
          const isSelected = property.latitude === center.lat && property.longitude === center.lng
          const brderColor = isSelected ? 'green' : '#22ccff'
          const glyphColor = isSelected ? 'green' : '#22ccff'
          const bgColor = isSelected ? '#22ccff' : '#0f677a'
          return (
            <AdvancedMarker
              key={property.property_id}
              position={{
                lat: property.latitude,
                lng: property.longitude,
              }}
              onClick={() => onClickMarker && onClickMarker(property)}
              title={'AdvancedMarker with customized pin.'}
            >
              <Pin
                background={bgColor}
                borderColor={brderColor}
                glyphColor={glyphColor}
                scale={1}
              ></Pin>
            </AdvancedMarker>
          )
        })}
      </Map>
    </APIProvider>
  )
}

export default MapContainer
