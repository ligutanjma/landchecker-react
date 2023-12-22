import { Drawer, Descriptions } from 'antd'
import React, { useEffect, useState } from 'react'
import { setLandmarkState } from '../../../redux/landmark/landmark.slice'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { shallowEqual } from 'react-redux'

// interface PropertyDetailsDrawerProps {
//   onClose: () => void
// }
function PropertyDetailsDrawer() {
  const [openMarkerDetails, setOpenMarkerDetails] = useState(false)
  const selectedPropery = useAppSelector(
    (state) => state.landmarkSlice.selectedProperty,
    shallowEqual,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    setOpenMarkerDetails(selectedPropery !== undefined)
  }, [selectedPropery])
  //   console.log(selectedPropery)

  const onClose = () => {
    dispatch(
      setLandmarkState({
        selectedPropery: undefined,
      }),
    )
    setOpenMarkerDetails(false)
  }
  return (
    <Drawer open={openMarkerDetails} mask={false} placement='right' onClose={onClose}>
      {selectedPropery && (
        <Descriptions layout='horizontal' title={'Property Details'}>
          <Descriptions.Item label='Address' span={24} labelStyle={{ width: 100 }}>
            {selectedPropery?.full_address}
          </Descriptions.Item>
          <Descriptions.Item label='Council' span={24} labelStyle={{ width: 100 }}>
            {selectedPropery?.council}
          </Descriptions.Item>
          <Descriptions.Item label='Postcode' span={24} labelStyle={{ width: 100 }}>
            {selectedPropery?.postcode}
          </Descriptions.Item>
          {/* <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item> */}
          {/* <Descriptions.Item label="Remark">empty</Descriptions.Item> */}
          {/* <Descriptions.Item label="Address">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item> */}
        </Descriptions>
      )}
    </Drawer>
  )
}

export default PropertyDetailsDrawer
