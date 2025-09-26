import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: number;
  name: string;
  // Adicione outras propriedades do usuário que precisar
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Exemplo de função de login
  // Em um app real, isso aconteceria após uma chamada de API
  const login = (userData: User) => {
    setUser(userData);
    // Você também pode salvar o usuário no localStorage para persistir a sessão
  };

  const logout = () => {
    setUser(null);
    // Limpe o localStorage se estiver usando
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};