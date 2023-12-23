import { LandmarkRepository } from '../repositories/LandmarkRepository'

export class LandmarkService {
  landmarkRepo: LandmarkRepository

  constructor(ir: LandmarkRepository) {
    this.landmarkRepo = ir
  }
  GetLandmarks() {
    return this.landmarkRepo.GetLandmarks()
  }
}
