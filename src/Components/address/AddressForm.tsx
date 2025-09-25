import React, { useState } from 'react';

interface AddressFormData {
  id?: number;
  title: string;
  type: "HOME" | "OFFICE";
  address: string;
  phone: string;
}

interface AddressFormProps {
  initialData?: AddressFormData;
  onSubmit: (data: AddressFormData) => void;
  onCancel: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<AddressFormData>(initialData || {
    title: '',
    type: 'HOME',
    address: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="address-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <label>
          Tipo:
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="HOME">HOME</option>
            <option value="OFFICE">OFFICE</option>
          </select>
        </label>
        <label>
          Endereço:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          Telefone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <div className="form-actions">
          <button type="submit" className="save-button">Salvar Endereço</button>
          <button type="button" className="cancel-button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;