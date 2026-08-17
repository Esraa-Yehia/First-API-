require('dotenv').config();
const express = require('express');
const app = express();

const httpStatusText = require('./utils/httpStatusText.js');


const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

mongoose.connect(url).then( ()=> {
    console.log('mongodb server strated')
})




app.use(express.json());

const coursesRoutes = require('./routes/courses.routes.js');

app.use('/api/courses',coursesRoutes);

app.use((req, res) => {
    return res.status(404).json({
        status: httpStatusText.ERROR,
        message: "this resource is not available"
    });
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});


