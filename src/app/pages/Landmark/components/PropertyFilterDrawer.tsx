import { Drawer, Select, List, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Landmark, setLandmarkState } from '../../../redux/landmark/landmark.slice'
import { DefaultOptionType } from 'antd/es/select'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { shallowEqual } from 'react-redux'

// interface PropertyFilterDrawerProps {}
function PropertyFilterDrawer() {
  //   const [openFilters, setOpenFilter] = useState(false)
  const [filteredCouncils, setFilteredCouncils] = useState<string[]>([])

  const { currentMarkers, landmarks, zoom, isFilterDrawerOpen } = useAppSelector(
    (state) => ({
      landmarks: state.landmarkSlice.landmarks,
      currentMarkers: state.landmarkSlice.currentMarkers,
      zoom: state.landmarkSlice.zoom,
      isFilterDrawerOpen: state.landmarkSlice.isFilterDrawerOpen,
    }),
    shallowEqual,
  )

  const dispatch = useAppDispatch()

  const initialCouncils = landmarks
    .filter(
      (landmarkObj, index, array) =>
        array.findIndex((item) => item.council === landmarkObj.council) === index,
    )
    .map((land) => land.council)
  const handleClickListAddress = (data: Landmark) => {
    // console.log(data)

    dispatch(
      setLandmarkState({
        currentPosition: {
          lat: data.latitude,
          lng: data.longitude,
        },
        selectedProperty: data,
        zoom: zoom !== 11 ? 20 : 11,
      }),
    )
  }

  const handleCloseFilter = () => {
    dispatch(
      setLandmarkState({
        isFilterDrawerOpen: false,
      }),
    )
  }

  const onClear = () => {
    dispatch(
      setLandmarkState({
        currentPosition: {
          lat: 0,
          lng: 0,
        },
        selectedProperty: undefined,
        currentMarkers: landmarks,
      }),
    )
    setFilteredCouncils(initialCouncils)
  }

  const handleFilter = (
    council: Landmark['council'],
    selectd: DefaultOptionType | DefaultOptionType[],
  ) => {
    if (!council.length) {
      onClear()
      return
    }

    let newMarkers: Landmark[] = []
    const newCouncils: string[] = []
    typeof selectd.forEach === 'function' &&
      selectd.forEach((opt: DefaultOptionType) => {
        const filtered = [...landmarks].filter((land) => land.council === opt.value)
        newCouncils.push(opt.value as string)
        newMarkers = [...newMarkers, ...filtered]
      })

    dispatch(
      setLandmarkState({
        currentMarkers: newMarkers,
      }),
    )
    setFilteredCouncils(newCouncils)
  }

  useEffect(() => {
    setFilteredCouncils(
      landmarks
        .filter(
          (landmarkObj, index, array) =>
            array.findIndex((item) => item.council === landmarkObj.council) === index,
        )
        .map((land) => land.council),
    )
  }, [landmarks])

  return (
    <Drawer
      placement='left'
      mask={false}
      open={isFilterDrawerOpen}
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
          onChange={handleFilter}
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
      <Typography.Text type='secondary'>
        {currentMarkers.length} properties available
      </Typography.Text>
      <List<string>
        dataSource={filteredCouncils}
        renderItem={(item) => (
          <List.Item>
            {item}
            <div style={{ backgroundColor: 'rgba(0,0,0, .1)', padding: 6 }}>
              <List
                dataSource={[...landmarks].filter((property) => property.council === item)}
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
  )
}

export default PropertyFilterDrawer
