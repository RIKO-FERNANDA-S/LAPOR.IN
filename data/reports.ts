import { Report } from "@/types/map";

export const reports: Report[] = [
  {
    id: "report-001",
    title: "Jalan berlubang",
    description: "Terdapat lubang cukup besar di tengah jalan.",
    rating: 2,
    category: "Kerusakan Jalan",
    position: [-7.7963, 110.3704],
  },

  {
    id: "report-002",
    title: "Lampu jalan mati",
    description: "Lampu penerangan jalan tidak menyala.",
    rating: 3,
    category: "Fasilitas",
    position: [-7.7951, 110.3690],
  },
];