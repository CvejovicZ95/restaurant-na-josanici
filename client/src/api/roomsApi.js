const API_BASE_URL = 'http://localhost:4500';

const getAllRooms = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/allRooms`);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateRoom = async (id, updatedName, updatedAbout, updatedPrice, updatedInfo) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/updateRoom/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: updatedName, about: updatedAbout, price: updatedPrice, info: updatedInfo })
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

export { getAllRooms, updateRoom };
