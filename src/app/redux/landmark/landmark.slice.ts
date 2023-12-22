import { createSlice } from "@reduxjs/toolkit"

export interface Landmark {
    "property_id": number
    "lga_code": number
    "council_property_number": string | null
    "full_address": string
    "council": string
    "postcode": string
    "latitude": number
    "longitude": number

}
interface LandmarkState {
    landmarks: Landmark[]
}

const initialState = { 
    landmarks: []
 } as LandmarkState

const landmarkSlice = createSlice({
    name: "landmark",
    initialState,
    reducers: {
    },
})

export const {  } = landmarkSlice.actions
export default landmarkSlice.reducer