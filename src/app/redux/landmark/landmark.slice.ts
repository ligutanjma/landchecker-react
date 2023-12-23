import { createSlice } from '@reduxjs/toolkit'
import { Coords } from '../../pages/Landmark'
import { Landmark } from '../../../domain/entities/Landmark'
import { getProperties } from './landmark.actions'

interface LandmarkState {
  landmarks: Landmark[]
  selectedProperty?: Landmark | undefined
  currentPosition: Coords
  currentMarkers: Landmark[]
  zoom: number
  isFilterDrawerOpen: boolean
}

const initialState = {
  landmarks: [],
  selectedProperty: undefined,
  currentPosition: {
    lat: 0,
    lng: 0,
  },
  zoom: 11,
  currentMarkers: [],
  isFilterDrawerOpen: false,
} as LandmarkState

const landmarkSlice = createSlice({
  name: 'landmark',
  initialState,
  reducers: {
    setLandmarkState: (state, action) => {
      state = {
        ...state,
        ...action.payload,
      }
      return state
    },
  },
  extraReducers(builder) {
    builder.addCase(getProperties.fulfilled, (state, actions) => {
      const propertiesArr = actions.payload
      if (!propertiesArr.length) {
        state.zoom = 1
        return
      }
      const position = { lat: propertiesArr[0].latitude || 0, lng: propertiesArr[0].longitude || 0 }
      state.currentPosition = position
      state.selectedProperty = propertiesArr[0]
      state.landmarks = propertiesArr
      state.currentMarkers = propertiesArr
      state.zoom = 11
    })
  },
})

export const { setLandmarkState } = landmarkSlice.actions
export default landmarkSlice.reducer
