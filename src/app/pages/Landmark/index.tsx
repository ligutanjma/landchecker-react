import { useEffect, useState } from 'react'
import { propertiesArr } from './utils'
import { Button, Descriptions, Drawer, List, Select, Typography } from 'antd'
import { Landmark } from '../../redux/landmark/landmark.slice'
import MapContainer from '../components/MapContainer'
import { FaFilter } from 'react-icons/fa'
import { DefaultOptionType } from 'rc-select/lib/Select'
export interface Coords {
  lat: number
  lng: number
}

function LandmarkContainer() {
  const [currentPos, setCurrentPos] = useState<Coords>({
    lat: 0,
    lng: 0,
  })
  const [markers, setMarkers] = useState<Landmark[]>([])
  // const [, setFilteredMarkers] = useState<Landmark[]>([])
  const [zoom, setZoom] = useState(11)
  const [openMarkerDetails, setOpenMarkerDetails] = useState(false)
  const [openFilters, setOpenFilter] = useState(false)
  const [markerDetails, setMarkerDetails] = useState<Landmark | null>(null)
  const [filteredCouncils, setFilteredCouncils] = useState<string[]>([])
  const [initialCouncils, setInitialCouncils] = useState<string[]>([])
  const [, setSelectedCouncil] = useState<string | undefined>(undefined)

  const handleOpenMarkerDetails = (data: Landmark) => {
    setOpenMarkerDetails(true)
    setMarkerDetails(data)
  }
  // console.log(filteredMarkers)

  const handleCloseMarkerDetails = () => {
    setOpenMarkerDetails(false)
    setMarkerDetails(null)
    setCurrentPos({
      lat: 0,
      lng: 0,
    })
  }
  const handleOpenFilter = () => {
    setOpenFilter(true)
    // setMarkerDetails(data)
  }

  const handleCloseFilter = () => {
    setOpenFilter(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectCouncil = (
    council: Landmark['council'],
    selectd: DefaultOptionType | DefaultOptionType[],
  ) => {
    console.log(council, selectd)
    setSelectedCouncil(council)

    // repopulate property list search
    if (!council.length) {
      onClear()
      return
    }

    let newMarkers: Landmark[] = []
    const newCouncils: string[] = []
    typeof selectd.forEach === 'function' &&
      selectd.forEach((opt: DefaultOptionType) => {
        const filtered = [...propertiesArr].filter((land) => land.council === opt.value)
        newCouncils.push(opt.value as string)
        newMarkers = [...newMarkers, ...filtered]
      })
    setFilteredCouncils(newCouncils)
    setMarkers(newMarkers)
    // setFilteredMarkers(markers)
  }

  // console.log(filteredCouncils)
  const onClear = () => {
    // setFilteredCouncils([])
    // const initial = [...propertiesArr].filter(
    //   (landmarkObj, index, array) =>
    //     array.findIndex((item) => item.council === landmarkObj.council) === index,
    // )
    // console.log(initial)
    setFilteredCouncils(initialCouncils)
    setMarkers(propertiesArr)
  }
  const zoomProperty = () => {
    if (zoom !== 11) return
    setZoom(20)
  }
  // const clearZoom = () => {
  //   setZoom(11)
  // }

  const handleClickListAddress = (land: Landmark) => {
    const position = { lat: land.latitude, lng: land.longitude }
    setCurrentPos(position)
    handleOpenMarkerDetails(land)
    zoomProperty()
  }

  useEffect(() => {
    setMarkers(propertiesArr)

    const currentProps = [...propertiesArr].filter(
      (landmarkObj, index, array) =>
        array.findIndex((item) => item.council === landmarkObj.council) === index,
    )
    setInitialCouncils(currentProps.map((land) => land.council))

    // checks if array contains data so we can display initial location
    if (!propertiesArr.length) return

    const position = { lat: propertiesArr[0].latitude || 0, lng: propertiesArr[0].longitude || 0 }
    setCurrentPos(position)
  }, [propertiesArr])

  useEffect(() => {
    const filtered: Landmark[] = [...markers].filter(
      (landmarkObj, index, array) =>
        array.findIndex((item) => item.council === landmarkObj.council) === index,
    )

    setFilteredCouncils(filtered.map((land) => land.council))
    // setFilteredMarkers(filtered)
  }, [markers])

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
            display: openFilters ? 'none' : 'block',
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
      <Drawer
        open={openMarkerDetails}
        mask={false}
        placement='right'
        onClose={handleCloseMarkerDetails}
      >
        <Descriptions layout='horizontal' title={'Property Details'}>
          <Descriptions.Item label='Address' span={24} labelStyle={{ width: 100 }}>
            {markerDetails?.full_address}
          </Descriptions.Item>
          <Descriptions.Item label='Council' span={24} labelStyle={{ width: 100 }}>
            {markerDetails?.council}
          </Descriptions.Item>
          <Descriptions.Item label='Postcode' span={24} labelStyle={{ width: 100 }}>
            {markerDetails?.postcode}
          </Descriptions.Item>
          {/* <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item> */}
          {/* <Descriptions.Item label="Remark">empty</Descriptions.Item> */}
          {/* <Descriptions.Item label="Address">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item> */}
        </Descriptions>
      </Drawer>
      <Drawer
        placement='left'
        mask={false}
        open={openFilters}
        onClose={handleCloseFilter}
        contentWrapperStyle={{
          padding: 12,
        }}
        style={{
          borderRadius: 4,
        }}
        bodyStyle={{
          padding: 12,
        }}
        title={
          <Select
            style={{
              width: '100%',
            }}
            // value={selectedCouncil}
            onChange={handleSelectCouncil}
            mode={'multiple'}
            maxTagCount={'responsive'}
            options={initialCouncils.map((council) => ({
              label: council,
              value: council,
            }))}
            allowClear
            onClear={onClear}
          />
        }
      >
        <Typography.Text type='secondary'>{markers.length} properties available</Typography.Text>
        <List<string>
          dataSource={filteredCouncils}
          renderItem={(item) => (
            <List.Item>
              {item}
              <div style={{ backgroundColor: 'rgba(0,0,0, .1)', padding: 6 }}>
                <List
                  dataSource={[...propertiesArr].filter((property) => property.council === item)}
                  renderItem={(councilItem) => (
                    <List.Item
                      className='list-hover'
                      style={{ padding: 6 }}
                      onClick={() => handleClickListAddress(councilItem)}
                    >
                      {councilItem.full_address}
                    </List.Item>
                  )}
                />
              </div>
            </List.Item>
          )}
        />
      </Drawer>
      <MapContainer
        zoom={zoom}
        center={currentPos}
        data={markers}
        onClickMarker={handleClickListAddress}
      />
    </div>
  )
}

export default LandmarkContainer
