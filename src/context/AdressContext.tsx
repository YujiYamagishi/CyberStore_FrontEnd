import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AddressItem {
  id: number;
  title: string;
  type: "HOME" | "OFFICE";
  address: string;
  phone: string;
}

interface AddressContextType {
  addresses: AddressItem[];
  addAddress: (newAddress: Omit<AddressItem, 'id'>) => void;
  updateAddress: (updatedAddress: AddressItem) => void;
  deleteAddress: (id: number) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [addresses, setAddresses] = useState<AddressItem[]>([
    { id: 1, title: "2118 Thornridge", type: "HOME", address: "2118 Thornridge Cir. Syracuse, Connecticut 35624", phone: "(209) 555-0104" },
    { id: 2, title: "Headoffice", type: "OFFICE", address: "2715 Ash Dr. San Jose, South Dakota 83475", phone: "(704) 555-0127" },
  ]);

  const addAddress = (newAddress: Omit<AddressItem, 'id'>) => {
    const newId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1;
    setAddresses(prev => [...prev, { ...newAddress, id: newId }]);
  };

  const updateAddress = (updated: AddressItem) => {
    setAddresses(prev => prev.map(a => a.id === updated.id ? updated : a));
  };

  const deleteAddress = (id: number) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  return (
    <AddressContext.Provider value={{ addresses, addAddress, updateAddress, deleteAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) throw new Error('useAddress must be used within an AddressProvider');
  return context;
};
