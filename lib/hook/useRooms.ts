"use client";

import { useQuery } from "@tanstack/react-query";
import { getRooms, getRoom } from "@/lib/api/rooms";

/**
 * Query key factory for rooms
 */
export const roomsKeys = {
  all: ["rooms"] as const,
  lists: () => [...roomsKeys.all, "list"] as const,
  list: (params?: { page?: number; limit?: number; search?: string }) =>
    [...roomsKeys.lists(), params] as const,
  details: () => [...roomsKeys.all, "detail"] as const,
  detail: (id: string) => [...roomsKeys.details(), id] as const,
};

/**
 * Hook to get all rooms
 */
export function useRooms(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: roomsKeys.list(params),
    queryFn: () => getRooms(params),
  });
}

/**
 * Hook to get a single room
 */
export function useRoom(id: string) {
  return useQuery({
    queryKey: roomsKeys.detail(id),
    queryFn: () => getRoom(id),
    enabled: !!id,
  });
}
