import { useEffect } from 'react'
import { Button } from 'antd'
import { setLandmarkState } from '../../redux/landmark/landmark.slice'
import MapContainer from '../components/MapContainer'
import { FaFilter } from 'react-icons/fa'
import PropertyDetailsDrawer from './components/PropertyDetailsDrawer'
import PropertyFilterDrawer from './components/PropertyFilterDrawer'
import { useAppDispatch } from '../../redux/store'
import { getProperties } from '../../redux/landmark/landmark.actions'
export interface Coords {
  lat: number
  lng: number
}

function LandmarkContainer() {
  const dispatch = useAppDispatch()

  const handleOpenFilter = () => {
    dispatch(
      setLandmarkState({
        isFilterDrawerOpen: true,
      }),
    )
  }
  // useEffect(() => {
  //   if (!propertiesArr.length) return

  //   const position = { lat: propertiesArr[0].latitude || 0, lng: propertiesArr[0].longitude || 0 }

  //   dispatch(
  //     setLandmarkState({
  //       currentPosition: position,
  //       selectedProperty: propertiesArr[0],
  //       landmarks: propertiesArr,
  //       currentMarkers: propertiesArr,
  //     }),
  //   )
  // }, [propertiesArr])

  useEffect(() => {
    dispatch(getProperties())
  }, [])

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div
        style={{
          position: 'absolute',
          zIndex: 99,
          top: 0,
          left: 0,
          padding: 24,
        }}
      >
        <Button
          size='large'
          shape='circle'
          onClick={handleOpenFilter}
          style={{
            boxShadow: '0px 0px 14px -2px rgba(0,0,0,0.75)',
            width: 60,
            height: 60,
            zIndex: 999,
          }}
        >
          <FaFilter
            style={{
              color: '#1677ff',
            }}
          />
        </Button>
      </div>
      <PropertyDetailsDrawer />
      <PropertyFilterDrawer />
      <MapContainer />
    </div>
  )
}

export default LandmarkContainer
