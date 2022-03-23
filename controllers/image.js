const Clarifai = require ('clarifai');

const app = new Clarifai.App({
  apiKey: "bf9f322b4d8f4cbda089ee82b5e1d2f5"
});

const handleApiCall = (req, res) => {
app.models
	.predict("d02b4508df58432fbb84e800597b8959", req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'))	
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries => {
  		res.json(entries[0].entries);
  	})
  	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}