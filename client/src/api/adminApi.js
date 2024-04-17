import config from "../config.json";
const apiUrl = config.API_BASE_URL;

export const loginUser = async (username, password) => {
  try {
    const res = await fetch(`${apiUrl}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.error) {
      throw new Error("Pogresno korisnicko ime ili lozinka");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logoutUser = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
