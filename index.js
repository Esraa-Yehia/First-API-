
const express = require('express');
const app = express();

app.use(express.json());

const coursesRoutes = require('./routes/courses.routes.js');

app.use('/api/courses',coursesRoutes);



app.listen(4000, () => {
    console.log('listening on port 4000');
});


