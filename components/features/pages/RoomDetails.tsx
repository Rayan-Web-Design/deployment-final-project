"use client";

import {
  assets,
  facilityIcons,
  roomCommonData,
  roomsDummyData,
} from "@/assets/assets";
import { StarRating } from "@/components/shared";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const room = roomsDummyData.find((room) => room._id === id);
      if (room) {
        setRoom(room);
        setMainImage(room?.images[0]);
      }
    }
  }, [id]);
  return room ? (
    <div className="py-28 md:py-36 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          {room.hotel.name}{" "}
          <span className="font-semibold text-sm">({room.roomTypes})</span>
        </h1>
        <p className="text-xs font-semibold py-1.5 px-3 text-white bg-orange-500 rounded-full">
          20% OFF
        </p>
      </div>
      <div className="flex items-center gap-1 mb-8">
        <StarRating value={4} readOnly />
        <p className="ml-2">200+ reviews</p>
      </div>
      <div className="flex items-center gap-1 text-gray-500 mt-2">
        <Image src={assets.locationIcon} alt={"location-icon"} />
        <span>{room.hotel.address}</span>
      </div>

      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2 w-full">
          <Image
            src={mainImage}
            alt="Room Image"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {room?.images.length > 1 &&
            room.images.map((image, index) => (
              <Image
                onClick={() => setMainImage(image)}
                key={index}
                src={image}
                alt="Room Image"
                className={`w-full rounded-xl shadow-md object-cover
                cursor-pointer ${mainImage === image && "outline-3 outline-orange-500"}`}
              />
            ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between mt-10">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold">
            Experience Luxury Like Never Before
          </h1>
          <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
            {room.amenities.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2
                    rounded-lg bg-gray-100"
              >
                <Image
                  src={facilityIcons[item]}
                  alt={item}
                  className="w-5 h-5"
                />
                <p className="text-xs">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-2xl font-medium">${room.pricePerNight}/night</p>
      </div>
      <form
        className="flex flex-col md:flex-row items-start md:items-center
      justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl
      mx-auto mt-16 max-w-6xl"
      >
        <div
          className="flex flex-col flex-wrap md:flex-row items-start
        md:items-center gap-4 md:gap-10 text-gray-500"
        >
          <div className="flex flex-col">
            <label htmlFor="checkInDate" className="font-medium">
              Check In
            </label>
            <input
              type="date"
              id="checkInDate"
              placeholder="Check-In"
              className="w-full rounded border border-gray-300 px-3 py-2 my-1.5
            outline-none"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="checkOutDate" className="font-medium">
              Check Out
            </label>
            <input
              type="date"
              id="checkOutDate"
              placeholder="Check-Out"
              className="w-full rounded border border-gray-300 px-3 py-2 my-1.5
            outline-none"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="guests" className="font-medium">
              Guests
            </label>
            <input
              type="number"
              id="guests"
              placeholder="0"
              className="max-w-20 rounded border border-gray-300 px-3 py-2 my-1.5
            outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dull
        active:scale-95 transition-all text-white rounded-md max-md:w-full
        max-md:mt-6 md:px-24 py-3 md:py-4 text-base cursor-pointer"
        >
          Check Availability
        </button>
      </form>

      <div className="mt-24 space-y-4">
        {roomCommonData.map((spec, index) => (
          <div key={index} className="flex items-start gap-2">
            <Image
              src={spec.icon}
              alt={`${spec.title}-icon`}
              className="w-6.5"
            />
            <div>
              <p className="text-base">{spec.title}</p>
              <p className="text-gray-500">{spec.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-3xl border-y border-gray-300 my-14 py-10 text-gray-500">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>

      <div className="flex flex-col items-start gap-4">
        <div className="flex gap-4">
          <Image
            src={room.hotel.owner.image}
            width={14}
            height={14}
            alt="Host"
            className="h-14 w-14 md:h-18 md:w-16 rounded-full"
          />
        </div>
        <div>
          <p className="text-lg md:text-xl">Hosted by {room.hotel.name}</p>
          <div className="flex items-center mt-1">
            <StarRating value={4} readOnly />
            <p className="ml-2">200+ reviews</p>
          </div>
        </div>
      </div>
      <button
        className="px-6 py-2.5 mt-4 rounded text-white bg-primary
      hover:bg-primary-dull transition-all cursor-pointer"
      >
        Contact Now
      </button>
    </div>
  ) : (
    <div className="py-28 px-4 text-center">
      <p className="text-lg text-gray-600">Room not found</p>
    </div>
  );
};

export default RoomDetails;
