import type { StaticImageData } from "next/image";

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
