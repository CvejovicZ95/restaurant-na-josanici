import config from '../config.json'
const apiUrl = config.API_BASE_URL

const getReservation = async (id) => {
  try {
    const res = await fetch(`${apiUrl}/api/reservation/${id}`);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllReservations = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/reservations`);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const markReservationAsProcessed = async (id) => {
  try {
    const res = await fetch(`${apiUrl}/api/reservation/${id}/processed`, {
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
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteReservation = async (id) => {
  try {
    const res = await fetch(`${apiUrl}/api/deleteReservation/${id}`, {
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
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkAvailability = async ({ arrivalDate, departureDate, roomId }) => {
  try {
    const res = await fetch(`${apiUrl}/api/checkAvailability`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ arrivalDate, departureDate, roomId })
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error('Error checking availability');
  }
};

const createSingleReservation = async ({ arrivalDate, departureDate, firstLastName, numberOfPersons, email, phoneNumber, additionalInfo, roomId }) => {
  try {
    const res = await fetch(`${apiUrl}/api/createReservation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ arrivalDate, departureDate, firstLastName, numberOfPersons, email, phoneNumber, additionalInfo, roomId })
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error('Error creating reservation');
  }
};

export { checkAvailability, createSingleReservation, getReservation, getAllReservations, markReservationAsProcessed, deleteReservation };
