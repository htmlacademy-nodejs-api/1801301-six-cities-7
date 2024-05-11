import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import {
  AmenityType,
  City,
  Events,
  Location,
  Offer,
  PropertyType,
  User,
  UserType,
} from '../../types/index.js';
import EventEmitter from 'node:events';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(private readonly filename: string) {
    super();
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

  private parseCoordinates(rentalCoordinates: string): Location {
    const [latitude, longitude] = rentalCoordinates.split(',');
    return {
      latitude: +latitude,
      longitude: +longitude,
    };
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit(Events.NewLineAdded, parsedOffer);
      }
    }

    this.emit(Events.ImportFinished, importedRowCount);
  }
}
