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
