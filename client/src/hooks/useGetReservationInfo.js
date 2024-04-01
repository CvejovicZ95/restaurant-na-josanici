import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useGetReservationInfo = (id) => {
  const [reservation, setReservation] = useState('');
  const [allReservations,setAllReservations]=useState([])

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await fetch(`http://localhost:4500/api/reservation/${id}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setReservation(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (id) {
      fetchReservation();
    }
  }, [id]);


  useEffect(()=>{
    const fetchAllReservations=async()=>{
      try{
        const res=await fetch('http://localhost:4500/api/reservations');
        const data=await res.json()
        if(data.error){
          throw new Error(data.error)
        }
        setAllReservations(data)
      }catch(error){
        toast.error(error.message)
      }
    }
    fetchAllReservations()
  },[allReservations])

  const markReservationAsProcessed = async (id) => {
    try {
      const res = await fetch(`http://localhost:4500/api/reservation/${id}/processed`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ processed: true })
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setAllReservations(prevReservations => prevReservations.map(res => res._id === id ? { ...res, processed: true } : res));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteReservation = async (id) => {
    try {
      const res = await fetch(`http://localhost:4500/api/deleteReservation/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ deleted: true })
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setAllReservations(prevReservations => prevReservations.filter(res => res._id === id ? { ...res, deleted: true } : res));

    } catch (error) {
      toast.error(error.message);
    }
  };
  
  return { reservation,allReservations,markReservationAsProcessed,deleteReservation };
};

export default  useGetReservationInfo;
