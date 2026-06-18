"use client";

import Image from "next/image";
import { useRooms } from "@/lib/hook";
import { LoadingSpinner, StarRating } from "@/components/shared";
import { assets, facilityIcons, roomsDummyData } from "@/assets/assets";
import { useState } from "react";
import { useRouter } from "next/navigation";

type CheckBoxProps = {
  label: string;
  selected?: boolean;
  onChange?: (checked: boolean, label: string) => void;
};

const CheckBox = ({
  label,
  selected = false,
  onChange = () => {},
}: CheckBoxProps) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

type RadioButtonProps = {
  label: string;
  selected?: boolean;
  onChange?: (label: string) => void;
};
const RadioButton = ({
  label,
  selected = false,
  onChange = () => {},
}: RadioButtonProps) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const AllRooms = () => {
  const router = useRouter();
  const [openFilters, setOpenFilters] = useState(false);
  const { data: roomsResponse, isLoading, error } = useRooms();
  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suits"];
  const priceRengers = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];
  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Rooms
          </h1>
          <p className="text-gray-600">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
        </div>
      </div>
    );
  }

  const rooms = roomsResponse?.data || [];

  return (
    <div
      className="flex flex-col-reverse lg:flex-row items-start justify-between
  pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32"
    >
      <div>
        <div className="flex flex-col items-start text-left">
          <h1 className="font-bold text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p
            className="text-sm md:text-base text-gray-500/90 mt-2
            max-w-174"
          >
            Take advantage of our limited-time offers and special package to
            enhance your stay and create unforgettable memories.
          </p>
        </div>

        {roomsDummyData.map((room) => (
          <div
            key={room._id}
            className="flex flex-col md:flex-row items-start
          py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
          >
            <Image
              onClick={() => {
                router.push(`/rooms/${room._id}`);
                scroll(0, 0);
              }}
              src={room.images[0]}
              alt="hotel.img"
              title="View Room Details"
              className="object-cover max-h-64 md:w-1/2 rounded-xl shadow-lg cursor-pointer"
            />
            <div className="md:w-1/2 flex flex-col gap-2">
              <p className="text-gray-500">
                {room.hotel?.city || "Unknown city"}
              </p>
              <p
                onClick={() => {
                  router.push(`/rooms/${room._id}`);
                  scroll(0, 0);
                }}
                className="text-gray-500 text-3xl font-bold cursor-pointer"
              >
                {room.hotel?.name || "Unknown Hotel"}
              </p>
              <div className="flex items-center">
                <StarRating value={4} readOnly />
                <p className="ml-2">200+ reviews</p>
              </div>
              <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                <Image
                  src={assets.locationIcon}
                  alt="icon.img"
                  title="View Icon Details"
                />
                <span>{room.hotel.address}</span>
              </div>
              <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                {room.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5F5]/70"
                  >
                    <Image
                      src={facilityIcons[item as keyof typeof facilityIcons]}
                      alt={item}
                      title="View Icon Details"
                    />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-xl font-medium text-gray-700">
                ${room.pricePerNight} /night
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 lg:mt-16">
        <div
          className={`flex items-center justify-between px-5 py-2.5
            lg:border-b border-b-gray-300 ${openFilters && "border-b"}`}
        >
          <p className="text-base font-medium text-gray-800">FILTER</p>
          <div className="text-xs cursor-pointer">
            <span
              onClick={() => setOpenFilters(!openFilters)}
              className="lg:hidden"
            >
              {openFilters ? "HIDE" : "SHOW"}
            </span>
            <span className="hidden lg:block">CLEAR</span>
          </div>
        </div>
        <div
          className={`${openFilters ? "h-auto" : "h-0 lg:h-auto"}
          overflow-hidden transition-all duration-700`}
        >
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Popular filters</p>
            {roomTypes.map((room, index) => (
              <CheckBox key={index} label={room} />
            ))}
          </div>
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Rang</p>
            {priceRengers.map((range, index) => (
              <CheckBox key={index} label={`$ ${range}`} />
            ))}
          </div>
          <div className="px-5 pt-5 pb-5">
            <p className="font-medium text-gray-800 pb-2">Price Rang</p>
            {sortOptions.map((option, index) => (
              <RadioButton key={index} label={option} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
