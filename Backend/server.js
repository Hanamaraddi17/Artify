const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const artworkRoutes = require('./routes/artworkRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const artistRoutes = require('./routes/artistRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/artworks', artworkRoutes);
app.use('/orders', orderRoutes);
app.use('/cart', cartRoutes);
app.use('/artist', artistRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
