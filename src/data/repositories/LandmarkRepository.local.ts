import { Landmark } from '../../domain/entities/Landmark'
import { LandmarkRepository } from '../../domain/repositories/LandmarkRepository'
import propertiesArr from './properties.json'

export class LandmarkLocalImplementation implements LandmarkRepository {
  GetLandmarks(): Landmark[] {
    return propertiesArr
  }
}
