import config from '../config.json'
const apiUrl = config.API_BASE_URL

const getRoomById = async (id) => {
  try {
    const res = await fetch(`${apiUrl}/api/room/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching room');
  }
};

const getReservedDates = async (id) => {
  try {
    const res = await fetch(`${apiUrl}/api/getReservedDates/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching reserved dates');
  }
};

export { getRoomById, getReservedDates };
