import React, { useState } from "react";
import '../../styles/address.css';
import { FaEdit, FaTimes, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddressForm from './AddressForm';
import { useAddress } from "../../context/AdressContext";

const Address: React.FC = () => {
  // Use o contexto para obter o estado e as funções
  const { addresses, addAddress, deleteAddress } = useAddress();
  const [selectedId, setSelectedId] = useState<number>(1);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleAddNew = () => {
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
  };

  const handleAddSubmit = (newAddress: Omit<AddressItem, 'id'>) => {
    addAddress(newAddress); // Use a função do contexto para adicionar
    setShowAddForm(false);
  };
  
  const handleDelete = (id: number) => {
    deleteAddress(id); // Use a função do contexto para deletar
    if (selectedId === id) {
      setSelectedId(0);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-address/${id}`);
  };

  return (
    // ... o restante do seu componente é o mesmo, exceto pelo uso do 'addresses' do contexto
    <div>
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
              <FaEdit className="icon" onClick={() => handleEdit(addr.id)} />
              <FaTimes className="icon" onClick={() => handleDelete(addr.id)} />
            </div>
          </div>
        ))}
      </div>

      {showAddForm ? (
        <AddressForm onSubmit={handleAddSubmit} onCancel={handleCancel} />
      ) : (
        <div className="addNew-container">
          <button className="addNew" onClick={handleAddNew}>
            <FaPlus /> Add New Address
          </button>
        </div>
      )}
    </div>
  );
};

export default Address;