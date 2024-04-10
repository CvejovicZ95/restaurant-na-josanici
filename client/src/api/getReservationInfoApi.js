const API_BASE_URL = 'http://localhost:4500';

const getReservation = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/reservation/${id}`);
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
    const res = await fetch(`${API_BASE_URL}/api/reservations`);
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
    const res = await fetch(`${API_BASE_URL}/api/reservation/${id}/processed`, {
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
    const res = await fetch(`${API_BASE_URL}/api/deleteReservation/${id}`, {
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

export { getReservation, getAllReservations, markReservationAsProcessed, deleteReservation };
