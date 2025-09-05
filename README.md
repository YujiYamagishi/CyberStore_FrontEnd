# ⚡ Cyber - Frontend

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
</p>

🚀 **Cyber Frontend** is the main web application of the Cyber ecosystem.  
It is built with **React + Vite + TypeScript**, styled with **Tailwind CSS + CSS3**, and fully integrated with the [Cyber Backend](https://github.com/fromanoel/cyber-web-backend.git).  

---

## 🌐 Project Ecosystem  

- **[Cyber - Backend](https://github.com/fromanoel/cyber-web-backend)** → API responsible for business logic and persistence  
- **Cyber - Frontend (this repo)** → React web client consuming the API  

---

## 🚀 Requirements  

- Node.js 24  
- Git  

---

## ⚙️ Getting Started  

1. **Clone the repository**  
   ```sh
   git clone https://github.com/Ericklys/cyber-web-frontend.git
   ```
2. Navigate into the project folder
   ```sh
   cd cyber-web-frontend
    ```
3. Install dependencies
   ```sh
   npm install
   ```
4. Configure environment variables
   ```sh
   cp .env.example .env
   ```
 Example:
```sh
DATABASE_URL="file:./dev.db"
  ```
5. Run the app in development mode
   ```sh
   npm run dev
   ```
The app will be available at 👉 http://localhost:5173


🛠️ Technologies Used

* React + TypeScript

* Vite

* Tailwind CSS

* React Router DOM

* Lucide Icons

* Css3

📂 Project Structure
```sh
.
├── public/                  # Static assets (images, svg, etc.)
│
├── src/                     
│   ├── assets/              # Additional resources
│   ├── components/          # Reusable components (Navbar, Footer, Cards, etc.)
│   ├── home/                # Home-specific components (Hero, ProductsNav, Suggest...)
│   ├── productDetails/      # Product detail components
│   ├── productsPage/        # Product listing, filters, pagination, etc.
│   ├── hooks/               # Custom hooks (e.g. useMediaQuery)
│   ├── pages/               # Main pages (Home, Products, ProductDetails)
│   ├── styles/              # CSS modules for components and pages
│   ├── App.tsx              # Root component
│   └── main.tsx             # Application entry point
│
├── .env                     # Environment variables
├── index.html               # Main HTML entry
├── package.json             # Dependencies and scripts
└── vite.config.ts           # Vite configuration
 ```
👨‍💻 Developers

## 👨‍💻 Developers  

### Frontend team  

| [<img src="https://avatars.githubusercontent.com/u/128267135?v=4" width=125><br><sub>Ericklys</sub>](https://github.com/Ericklys) | [<img src="https://avatars.githubusercontent.com/u/133705031?v=4" width=125><br><sub>Tarcisio Lucas</sub>](https://github.com/T-Lucas43) | [<img src="https://avatars.githubusercontent.com/u/181165633?v=4" width=125><br><sub>Yuji Yamagishi</sub>](https://github.com/YujiYamagishi) | [<img src="https://avatars.githubusercontent.com/u/18268176?v=4" width=125><br><sub>Alvino Pedrosa</sub>](https://github.com/alvinopf) |
| :---: | :---: | :---: | :---: |

### Backend team  

| [<img src="https://avatars.githubusercontent.com/u/130419872?v=4" width=125><br><sub>Fernanda Romanoel</sub>](https://github.com/fromanoel) | [<img src="https://avatars.githubusercontent.com/u/112771403?v=4" width=125><br><sub>Fernando Emidio</sub>](https://github.com/Fernando7492) | [<img src="https://avatars.githubusercontent.com/u/117694456?v=4" width=125><br><sub>Jefferson Lucas</sub>](https://github.com/JeufoDev) |
| :---: | :---: | :---: |
