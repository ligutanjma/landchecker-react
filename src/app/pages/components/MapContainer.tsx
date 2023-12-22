import React from 'react'
import { APIProvider, AdvancedMarker, Map, Pin } from '@vis.gl/react-google-maps'
import { Landmark, setLandmarkState } from '../../redux/landmark/landmark.slice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { shallowEqual } from 'react-redux'

function MapContainer() {
  // console.log(process.env.REACT_APP_GOOGLE_API_KEY)
  const { currentMarkers, currentPosition, zoom } = useAppSelector(
    (state) => ({
      currentMarkers: state.landmarkSlice.currentMarkers,
      currentPosition: state.landmarkSlice.currentPosition,
      zoom: state.landmarkSlice.zoom,
    }),
    shallowEqual,
  )
  const dispatch = useAppDispatch()
  const onClickMarker = (land: Landmark) => {
    // console.log(land)

    dispatch(
      setLandmarkState({
        currentPosition: {
          lat: land.latitude,
          lng: land.longitude,
        },
        selectedProperty: land,
      }),
    )
  }
  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY || ''} libraries={['marker']}>
      <Map zoom={zoom} center={currentPosition} mapId={'7975d2f5579a2197'} disableDefaultUI={true}>
        {currentMarkers.map((property) => {
          const isSelected =
            property.latitude === currentPosition.lat && property.longitude === currentPosition.lng
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
              onClick={() => onClickMarker(property)}
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
