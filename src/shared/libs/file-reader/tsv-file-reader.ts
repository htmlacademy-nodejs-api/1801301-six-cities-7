import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import {
  AmenityType,
  City,
  Offer,
  PropertyType,
  User,
  UserType,
} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      createdDate,
      city,
      previewImagePath,
      propertyImages,
      favorite,
      premium,
      rating,
      propertyType,
      numberOfRooms,
      numberOfGuests,
      price,
      amenities,
      user,
      numberOfComments,
      rentalCoordinates,
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(createdDate),
      city: city as City,
      previewImagePath,
      propertyImages: [propertyImages],
      favorite: !!favorite,
      premium: !!premium,
      rating: +rating,
      propertyType: propertyType as PropertyType,
      numberOfRooms: +numberOfRooms,
      numberOfGuests: +numberOfGuests,
      price: this.parsePrice(price),
      amenities: this.parseAmenities(amenities) as AmenityType[],
      rentalCoordinates: this.parseCoordinates(rentalCoordinates),
      numberOfComments: +numberOfComments,
      author: this.parseUser(user),
    };
  }

  private parseAmenities(amenitiesString: string): AmenityType[] {
    return amenitiesString.split(';').map((name) => name as AmenityType);
  }

  private parsePrice(priceString: string): number {
    return Number.parseInt(priceString, 10);
  }

  private parseUser(user: string): User {
    const [email, name, password, avatarPath, userType] = user.split(',');
    return {
      email,
      name,
      password,
      avatarPath,
      userType: userType as UserType,
    };
  }

  private parseCoordinates(rentalCoordinates: string) {
    const [latitude, longitude] = rentalCoordinates.split(',');
    return {
      latitude: +latitude,
      longitude: +longitude,
    };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
