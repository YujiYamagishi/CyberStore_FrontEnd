import React, { useState } from "react";
import '../../../styles/address.css';
import { FaEdit, FaTimes, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddressForm from './AddressForm';
import { useAddress } from "../../context/AdressContext";

interface AddressItem {
  id: number;
  title: string;
  type: "HOME" | "OFFICE";
  address: string;
  phone: string;
}

interface AddressProps {
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

const Address: React.FC<AddressProps> = ({ selectedId, onSelect }) => {
  const { addresses, addAddress, deleteAddress } = useAddress();
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleAddNew = () => setShowAddForm(true);
  const handleCancel = () => setShowAddForm(false);

  const handleAddSubmit = (newAddress: Omit<AddressItem, 'id'>) => {
    addAddress(newAddress);
    setShowAddForm(false);
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteAddress(id);
    if (selectedId === id) {
      onSelect(null);
    }
  };

  const handleEdit = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit-address/${id}`);
  };

  return (
    <div className="pageContainer">

      <div className="addressList">
        <h2>Select Address</h2>
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`addressCard ${selectedId === addr.id ? 'selected' : ''}`}
            onClick={() => onSelect(addr.id)}
          >
            <div className="radio">
              <input
                type="radio"
                checked={selectedId === addr.id}
                onChange={() => onSelect(addr.id)}
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
              <FaEdit className="icon" onClick={(e) => handleEdit(addr.id, e)} />
              <FaTimes className="icon" onClick={(e) => handleDelete(addr.id, e)} />
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
