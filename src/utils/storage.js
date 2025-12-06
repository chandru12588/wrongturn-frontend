// Get a value from localStorage
export const getFromStorage = (key, fallback = null) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

// Save a value to localStorage
export const saveToStorage = (key, obj) => {
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.error("Storage Error:", err);
  }
};
