type StaticImageData = import("next/image").StaticImageData;

/**
 * Room interface
 */
declare interface RoomI {
  _id: string;
  title: string;
  description: string;
  price: {
    base: number;
    discount?: number;
  };
  maxPeople: number;
  amenities: string[];
  images: (string | StaticImageData)[];
  isAvailable: boolean;
  hotel?: {
    name: string;
    city: string;
    address?: string;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Room list response
 */
declare interface RoomsResponse {
  data: RoomI[];
  total: number;
  page: number;
  limit: number;
}
