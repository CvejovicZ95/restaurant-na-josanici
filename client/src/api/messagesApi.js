const API_BASE_URL = 'http://localhost:4500';

export const createMessage = async ({ firstLastName, email, phoneNumber, question }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/createMessage`, {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ firstLastName, email, phoneNumber, question })
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

export const fetchAllMessages = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/allMessages`);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteMessage = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/deleteMessage/${id}`, {
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