import { createAsyncThunk } from '@reduxjs/toolkit'
import { LandmarkLocalImplementation } from '../../../data/repositories/LandmarkRepository.local'
import { LandmarkService } from '../../../domain/usecases/LandmarkService'

const localImpl = new LandmarkLocalImplementation()

export const getProperties = createAsyncThunk('landmark/getProperties', () => {
  const memberService = new LandmarkService(localImpl)
  return memberService.GetLandmarks()
})
