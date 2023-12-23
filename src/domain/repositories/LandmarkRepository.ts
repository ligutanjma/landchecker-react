import { Landmark } from '../entities/Landmark'

export interface LandmarkRepository {
  GetLandmarks(): Landmark[]
}
