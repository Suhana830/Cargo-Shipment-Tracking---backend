# 🚚 Cargo Shipment Tracking - Backend

This is the **backend** service for the **Cargo Shipment Tracking** application. It manages shipment records, handles location updates, and provides Estimated Time of Arrival (ETA). The backend is built using **Node.js**, **Express.js**, and **MongoDB**, with integration to **https://geocode.maps.co/** for geolocation services.

---

## 🛠️ Tech Stack

| Tech              | Purpose                             |
|------------------|-------------------------------------|
| Node.js           | JavaScript runtime                  |
| Express.js        | Web framework                       |
| MongoDB + Mongoose| NoSQL database & object modeling    |
| dotenv            | Manage environment variables        |
| axios             | API calls to external services       |
| cors              | Enable cross-origin requests        |
| moment.js         | Time and date formatting            |

---

## 🔐 Environment Variables

Create a `.env` file in your project root with the following keys:

```env
PORT=5000
MONGO_URL=your_mogodb_url
API_KEY=your_geocode_maps_api_key
```
API_KEY is used to query geolocation data from https://geocode.maps.co/.


##🚀 Installation
### 1 Clone the repository

```bash

git clone https://github.com/Suhana830/Cargo-Shipment-Tracking---backend.git
cd backend
```

### 2 Install dependencies

```bash

npm install
```

### 3 Create a .env file as shown above.
### 4 Start the server

```bash

npm start
```

## 🌐 API Endpoints

### 📦 Shipment APIs

| Method | Endpoint                          | Description                                         |
|--------|-----------------------------------|-----------------------------------------------------|
| GET    | `/shipments`                      | Retrieve all shipment records                      |
| POST   | `/shipment`                       | Add a new shipment                                 |
| GET    | `/shipment/:id`                   | Get shipment by ID                                 |
| POST   | `/shipment/:id/update-location`   | Update location of shipment (`newLocation` in body)|
| GET    | `/shipment/:id/eta`               | Get ETA (Estimated Time of Arrival) for the shipment |


## 🌍 Geolocation
Uses https://geocode.maps.co/ to convert location names to coordinates (latitude/longitude).

Example API call:
https://geocode.maps.co/search?q=delhi&api_key=YOUR_API_KEY

## 🧩 Folder Structure
```bash

📁 backend/
├── 📂 controller/         # Business logic
├── 📂 model/              # Mongoose schemas
├── 📂 route/              # API routes
├── 📂 lib/              # DB connection
├── .env                   # Environment config
├── server.js              # App entry point
└── package.json
```

## 📌 Notes
- Ensure MongoDB is running locally or use MongoDB Atlas with correct URI.

- This backend connects to a React-based frontend (see separate frontend repo -https://github.com/Suhana830/Cargo-Shipment-Tracking---frontend).

- All API responses are in JSON format.

## 📄 License
This project is open-sourced under the MIT License.

## 🙋‍♀️ Author
- Suhana Gupta
- GitHub: @Suhana830

