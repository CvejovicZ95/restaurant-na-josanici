import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const useGetRoomById = (id) => {
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomRes = await fetch(`http://localhost:4500/api/room/${id}`);
        const roomData = await roomRes.json();
        setRoom(roomData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching room:', error);
        toast.error('Error fetching room');
      }
    };

    const fetchReservedDates = async () => {
      try {
        const reservedDatesRes = await fetch(`http://localhost:4500/api/getReservedDates/${id}`);

        const reservedDatesData = await reservedDatesRes.json();

        setReservedDates(reservedDatesData); 
      } catch (error) {
        console.error('Error fetching reserved dates:', error);
        toast.error('Error fetching reserved dates');
      }
    };

    fetchRoom();
    fetchReservedDates();
  }, [id]);

  return { loading, room, reservedDates };
};

export { useGetRoomById };
