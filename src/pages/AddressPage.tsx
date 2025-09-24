// AddressPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Importe o seu componente de Address
import Address from '../Components/address/address'; 

// Importe os estilos da página (CSS puro), sem a variável 'styles'
import '../styles/address.css';

const AddressPage: React.FC = () => {
const navigate = useNavigate();

const handleBack = () => {
navigate(-1);
};

const handleNext = () => {
 navigate('/shipping'); 
};

return (
<div className="pageContainer">
<header className="header">
<h1>Checkout</h1>
</header>

<main className="mainContent">
 <Address />
</main>

<footer className="footer-back-next">
<button onClick={handleBack} className="backButton">
Back
</button>
<button onClick={handleNext} className="nextButton">
 Next
</button>
</footer>
</div>
);
};

export default AddressPage;