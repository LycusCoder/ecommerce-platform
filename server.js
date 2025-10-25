// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Untuk parsing application/json

// Contoh Route Sederhana
app.get('/', (req, res) => {
    res.status(200).json({ message: 'E-commerce API is running! 🚀' });
});

// TODO: Tambahkan koneksi DB dan Redis di sini (akan kita buat di langkah berikutnya)
// TODO: Import dan gunakan routes di sini

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
