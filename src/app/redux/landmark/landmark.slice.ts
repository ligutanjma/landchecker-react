import { createSlice } from '@reduxjs/toolkit'
import { Coords } from '../../pages/Landmark'

export interface Landmark {
  property_id: number
  lga_code: number
  council_property_number: string | null
  full_address: string
  council: string
  postcode: string
  latitude: number

  longitude: number
}
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
})

export const { setLandmarkState } = landmarkSlice.actions
export default landmarkSlice.reducer
