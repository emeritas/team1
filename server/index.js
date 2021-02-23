const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const routes = require('./routes/routes');
var bodyParser = require('body-parser');
var cors = require('cors')

mongoose.connect('mongodb://localhost/reviews-db', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
})

const corsOptions = {
    exposedHeaders: ['todo-auth']
}
app.use(cors(corsOptions))

app.use(bodyParser.json());

app.use('/api', routes);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
