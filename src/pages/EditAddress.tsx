import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useAddress } from '../context/AdressContext';
import '../styles/editAdress.css'

// Assumindo a interface AddressItem do AddressContext
interface AddressItem {
    id: number;
    title: string;
    type: "HOME" | "OFFICE";
    address: string;
    phone: string;
}

const EditAddress: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { addresses, updateAddress } = useAddress();

  const [addressData, setAddressData] = useState<Omit<AddressItem, 'id'>>({
    title: '',
    // Garante que o estado inicial é de um tipo válido
    type: 'HOME', 
    address: '',
    phone: '',
  });

  useEffect(() => {

    const addressToEdit = addresses.find(addr => addr.id === Number(id));
    if (addressToEdit) {
      // O spread operator funciona bem aqui, pois o tipo AddressItem é compatível
      setAddressData(addressToEdit); 
    } else {
      navigate('/address');
    }
  }, [id, navigate, addresses]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setAddressData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // CORREÇÃO TS2345: Aplicando type casting para garantir que o 'type'
    // é um dos literais esperados ("HOME" | "OFFICE").
    const updatedData = {
        ...addressData,
        type: addressData.type as "HOME" | "OFFICE",
        id: Number(id)
    };
    
    updateAddress(updatedData);
    navigate('/address');
  };

  return (
    <div className="edit-container">
      <div className="header">
        <button onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft /> Voltar
        </button>
        <h2>Editar Endereço</h2>
      </div>
      <form onSubmit={handleSubmit} className="edit-form">
        <label>
          Título:
          <input type="text" name="title" value={addressData.title} onChange={handleChange} />
        </label>
        <label>
          Tipo:
          <select 
             name="type" 
             value={addressData.type} 
             onChange={handleChange}
             // Embora o tipo seja string no evento, sabemos que o valor será 'HOME' ou 'OFFICE'
             // conforme as opções do select.
          >
            <option value="HOME">HOME</option>
            <option value="OFFICE">OFFICE</option>
          </select>
        </label>
        <label>
          Endereço:
          <input type="text" name="address" value={addressData.address} onChange={handleChange} />
        </label>
        <label>
          Telefone:
          <input type="text" name="phone" value={addressData.phone} onChange={handleChange} />
        </label>
        <button type="submit" className="save-button">Salvar</button>
      </form>
    </div>
  );
};

export default EditAddress;