import type { RequestStatus } from "../types";

export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US').format(date)
}
export const getStatusBadge = (status: RequestStatus) => {
  switch (status) {
    case "CREATED":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";

    case "ASSIGNED":
      return "bg-blue-100 text-blue-800 border-blue-300";

    case "ACCEPTED":
      return "bg-emerald-100 text-emerald-800 border-emerald-300";

    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-800 border-blue-300";
      
    case "ON_THE_WAY":
    case "ARRIVED":
      return "bg-purple-100 text-purple-800 border-purple-300";

    case "COMPLETED":
      return "bg-green-100 text-green-800 border-green-300";

    case "CANCELLED":
      return "bg-red-100 text-red-800 border-red-300";

    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};