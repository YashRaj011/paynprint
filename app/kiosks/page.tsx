"use client";
import KioskDirectoryPage, {
  type KioskInfo,
} from "@/components/KioskDirectoryPage";
import Loading from "@/components/Loading";
import { useNotification } from "@/components/Notification";
import NotificationMessages, { getErrorMessage } from "@/components/NotificationMessages";
import axios from "axios";
import { useEffect, useState } from "react";

// const sampleKiosks: KioskInfo[] = [
//   {
//     id: "1",
//     kioskName: "Main Campus Library",
//     humanReadableId: "kiosk_001",
//     location: "Central Library - Ground Floor",
//     status: "online",
//     imageUrl:
//       "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=240&q=80",
//   },
//   {
//     id: "2",
//     kioskName: "Hostel Common Room",
//     humanReadableId: "kiosk_002",
//     location: "Boys Hostel Block B - Lobby",
//     status: "offline",
//     imageUrl:
//       "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=240&q=80",
//   },
//   {
//     id: "3",
//     kioskName: "Engineering Building",
//     humanReadableId: "kiosk_003",
//     location: "Academic Block 2 - 1st Floor",
//     status: "online",
//     imageUrl:
//       "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=240&q=80",
//   },
//   {
//     id: "4",
//     kioskName: "Student Activity Center",
//     humanReadableId: "kiosk_004",
//     location: "SAC - Near Cafeteria",
//     status: "online",
//     imageUrl:
//       "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=240&q=80",
//   },
//   {
//     id: "5",
//     kioskName: "Admin Office",
//     humanReadableId: "kiosk_005",
//     location: "Admin Block - Ground Floor",
//     status: "offline",
//     imageUrl:
//       "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=240&q=80",
//   },
// ];

export default function KiosksPage() {
  const [kiosk, setKiosk] = useState<KioskInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useNotification();
  const fetchData = async () => {
    try {
      const fetchKioskData = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/kiosk/`,
      );
      setKiosk(fetchKioskData.data.kiosks);
    } catch (err: any) {
      console.error("Error fetching print booths:", err);
      showError(getErrorMessage(err?.response?.data?.error, NotificationMessages.KIOSK_FETCH));
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);

  return isLoading || kiosk.length === 0 ? (
    <Loading text="Fetching Print Booths" />
  ) : (
    <KioskDirectoryPage kiosks={kiosk} />
  );
}
