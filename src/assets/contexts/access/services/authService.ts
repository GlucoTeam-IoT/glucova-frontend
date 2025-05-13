export const login = async (email: string, password: string) => {
  // Simula respuesta del backend
  if (email === "test@glucova.com" && password === '123456') {
    return { token: "fake-token", user: { id: 1, email } };
  }
  throw new Error("Credenciales inválidas");
};

export const register = async (email: string, password: string) => {
  return { message: "Usuario registrado correctamente", user: { id: Date.now(), email } };
};
