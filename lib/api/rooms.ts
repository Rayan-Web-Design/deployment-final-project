/**
 * Rooms API — real backend calls via apiClient
 */

import { apiClient } from "./client";

/**
 * Get all rooms with optional pagination
 */
export async function getRooms(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<RoomsResponse> {
  const { data } = await apiClient.get<{
    success: boolean;
    message: string;
    data: RoomI[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }>("/room", {
    params,
  });

  // Transform backend response to match frontend expectations
  return {
    data: data.data,
    total: data.pagination.total,
    page: data.pagination.page,
    limit: data.pagination.limit,
  };
}

/**
 * Get a single room by ID
 */
export async function getRoom(id: string): Promise<RoomI> {
  const { data } = await apiClient.get<{
    success: boolean;
    message: string;
    data: RoomI;
  }>(`/room/${id}`);
  return data.data;
}
