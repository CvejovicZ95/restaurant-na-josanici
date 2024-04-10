const API_BASE_URL = 'http://localhost:4500';

const checkAvailability = async ({ arrivalDate, departureDate, roomId }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/checkAvailability`, {
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
    const res = await fetch(`${API_BASE_URL}/api/createReservation`, {
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
