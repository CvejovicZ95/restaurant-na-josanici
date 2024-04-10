const API_BASE_URL = 'http://localhost:4500';

const getRoomById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/room/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching room');
  }
};

const getReservedDates = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/getReservedDates/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching reserved dates');
  }
};

export { getRoomById, getReservedDates };
