import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getReservation,
  getAllReservations,
  markReservationAsProcessed,
  deleteReservation,
} from "../api/reservationApi.js";

export const useGetReservationInfo = (id) => {
  const [reservation, setReservation] = useState("");
  const [allReservations, setAllReservations] = useState([]);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const data = await getReservation(id);
        setReservation(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (id) {
      fetchReservation();
    }
  }, [id]);

  useEffect(() => {
    const fetchAllReservations = async () => {
      try {
        const data = await getAllReservations();
        setAllReservations(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchAllReservations();
  }, [allReservations]);

  const markReservationAsProcessedHandler = async (id) => {
    try {
      await markReservationAsProcessed(id);
      setAllReservations((prevReservations) =>
        prevReservations.map((res) =>
          res._id === id ? { ...res, processed: true } : res,
        ),
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteReservationHandler = async (id) => {
    try {
      await deleteReservation(id);
      setAllReservations((prevReservations) =>
        prevReservations.filter((res) =>
          res._id === id ? { ...res, deleted: true } : res,
        ),
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  return {
    reservation,
    allReservations,
    markReservationAsProcessedHandler,
    deleteReservationHandler,
  };
};
