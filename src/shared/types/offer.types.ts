import { AmenityType } from './amenity-type.enum.js';
import { City } from './cities.enum.js';
import { PropertyType } from './property-type.enum.js';
import { User } from './user.types.js';

export type Offer = {
  /** min 10 max 100 */
  name: string;
  /** min 20 max 1024 */
  description: string;
  /** e,g, '2024-01-15T09:51:10.735Z' */
  publicationDate: Date;
  /** Paris | Cologne | Hamburg | Brussels |Amsterdam | Dusseldorf */
  city: City;
  /** path to the image preview */
  previewImagePath: string;
  /** always 6 pics links/urls [string, string, string, string, string, string]; */
  propertyImages: string[];
  /** flag whether it is premium or not */
  premium: boolean;
  /** flag whether it is in user's favorites */
  favorite: boolean;
  /** from 1 to 5, can be .1 to .9 */
  rating: number;
  /** 'apartment' | 'house' | 'room' | 'hotel' */
  propertyType: PropertyType;
  /** min 1 max 8 */
  numberOfRooms: number;
  /** min 1 max 10 */
  numberOfGuests: number;
  /** min 100 max 100 000*/
  rentalCost: number;
  /** 'Washer' | 'Towels' | 'Fridge' |  'Baby seat' |
   *  'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace',
   *   1 or many
   */
  amenities: AmenityType[];
  /** User entity */
  author: User;
  /** computed on fly */
  numberOfComments: number;
  /** latitude/longitude */
  rentalCoordinates: {
    latitude: number;
    longitude: number;
  };
};
