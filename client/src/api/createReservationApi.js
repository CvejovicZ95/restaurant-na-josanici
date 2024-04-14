import config from '../config.json'
const apiUrl = config.API_BASE_URL

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

export { checkAvailability, createSingleReservation };
