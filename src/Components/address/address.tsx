// Address.tsx
import React, { useState } from "react";
import '../../styles/address.css';
import { FaEdit, FaTimes, FaPlus } from "react-icons/fa";

interface AddressItem {
  id: number;
  title: string;
  type: "HOME" | "OFFICE";
  address: string;
  phone: string;
}

const Address: React.FC = () => {
  const [addresses, setAddresses] = useState<AddressItem[]>([
    {
      id: 1,
      title: "2118 Thornridge",
      type: "HOME",
      address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
      phone: "(209) 555-0104",
    },
    {
      id: 2,
      title: "Headoffice",
      type: "OFFICE",
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      phone: "(704) 555-0127",
    },
  ]);

  const [selectedId, setSelectedId] = useState<number>(1);

  // Adicione uma função para lidar com o clique do novo botão
  const handleAddNew = () => {
    // Lógica para adicionar um novo endereço
    alert("Adicionar novo endereço clicado!");
    // Aqui você pode adicionar lógica de navegação ou exibir um formulário
  };

  return (
    <div>
      <div className="steps">
        <div className="step-active">Step 1<br /><span>Address</span></div>
        <div className="step">Step 2<br /><span>Shipping</span></div>
        <div className="step">Step 3<br /><span>Payment</span></div>
      </div>

      <h2>Select Address</h2>

      <div className="addressList">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`addressCard ${selectedId === addr.id ? 'selected' : ''}`}
            onClick={() => setSelectedId(addr.id)}
          >
            <div className="radio">
              <input
                type="radio"
                checked={selectedId === addr.id}
                onChange={() => setSelectedId(addr.id)}
              />
            </div>
            <div className="addressInfo">
              <div className="title">
                {addr.title} <span className="type">{addr.type}</span>
              </div>
              <div>{addr.address}</div>
              <div>{addr.phone}</div>
            </div>
            <div className="actions">
              <FaEdit className="icon" />
              <FaTimes className="icon" />
            </div>
          </div>
        ))}
      </div>

      {/* A DIV foi substituída por um BUTTON e um manipulador de eventos onClick foi adicionado */}
       <div className="addNew-container">
      <button className="addNew" onClick={handleAddNew}>
        <FaPlus /> Add New Address
      </button>
    </div>
    </div>
  );
};

export default Address;