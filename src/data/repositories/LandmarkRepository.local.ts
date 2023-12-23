import { Landmark } from '../../domain/entities/Landmark'
import { LandmarkRepository } from '../../domain/repositories/LandmarkRepository'
import propertiesArr from './properties.json'

export class LandmarkLocalImplementation implements LandmarkRepository {
  GetLandmarks(): Landmark[] {
    if (!propertiesArr) return []
    return propertiesArr as Landmark[]
  }
}
