const fs = require('fs');
const hbs = require('hbs');
const express = require('express');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, resp, next)=>{
	const now = new Date().toString();

	const log = `${now}: ${req.method} ${req.url}`;

	fs.appendFile('server.log', log + "\n", err => {
		if(err){
			console.log('Unable to log to server.log');
		} 
	});
	console.log(log);
	next();
})

app.use((req, resp, next) => {
	resp.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('streamIt', (text) => {
	return text.toUpperCase();
})

app.get('/', (request, response) => {
	// response.send('<h1>Hello Express!</h1>');
	response.render("index.hbs", {
		pageTitle: 'Home Page',
		currentYear: new Date().getFullYear(),
		welcomeMessage: 'You\'re welcome to my first Express website.. Let wait and see how things goes!',
	});
});

app.get('/about', (request, response) => {
	response.render('about.hbs', {
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (request, response) => {
	response.send({
		errorMessage: 'Unable to parse request'
	});
})


app.listen(3000, () => {
	console.log('Server is started on port:3000');
});