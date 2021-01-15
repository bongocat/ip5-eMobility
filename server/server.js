const express = require('express');
const apiRouter = require('./routes');

const app = express();

process.env.TZ = 'Europe/Berlin'

app.use(express.json());
app.use('/api/megalog', apiRouter);


app.listen(process.env.PORT || '3000', () => {
        console.log(`Server is running on port:  ${process.env.PORT || '3000 '}`)
    }
);