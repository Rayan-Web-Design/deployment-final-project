"use client";
import { roomsDummyData } from "@/assets/assets";
import React from "react";
import RoomSection from "./RoomSection";
import Title from "@/components/shared/Title";
import { useRouter } from "next/navigation";

const ExploreRoom = () => {
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center px-6 md:px-16 lg:px-24
    bg-slate-50 py-20"
    >
      <Title
        title="Featured Destination"
        subTitle="Discover our
      handpicked selection of exceptional properties around the world,
      offering unparalleled luxury and unforgettable experience"
      />
      <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
        {roomsDummyData.slice(0, 4).map((room, index) => (
          <RoomSection key={room._id} room={room} index={index} />
        ))}
      </div>
      <button
        onClick={() => {
          router.push("/rooms");
          scrollTo(0, 0);
        }}
        className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded
        bg-white hover:bg-gray-50 transition-all cursor-pointer"
      >
        View All Destinantion
      </button>
    </div>
  );
};

export default ExploreRoom;
