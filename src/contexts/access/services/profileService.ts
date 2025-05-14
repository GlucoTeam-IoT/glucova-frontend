let mockUser = {
  id: 1,
  fullName: "John Doe",
  email: "john@example.com",
  age: "35",
  photoUrl: "/Glucova.png",
};

export const getProfile = async () => {
  // Simula llamada a backend
  return Promise.resolve({ ...mockUser });
};

export const updateProfile = async (data: typeof mockUser) => {
  // Simula guardado
  mockUser = { ...mockUser, ...data };
  return Promise.resolve({ success: true });
};
