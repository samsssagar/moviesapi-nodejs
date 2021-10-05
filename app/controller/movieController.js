var movies = require('../models/movies');
var Joi = require('joi');

// CREATE A MOVIE
function create_a_movie(req, res) {

    //Input Validation
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        year: Joi.string().required(),
        genre: Joi.string().required()
    });
    const result = schema.validate(req.body);
    console.log(result);
    if(result.error) {
        res.send(result.error.details);
    }
    else {
        const movie = {
            id: movies.length + 1,
            name: req.body.name,
            year: req.body.year,
            genre: req.body.genre
        };
        movies.push(movie);
        res.send(movies);
    }
}

// LIST ALL MOVIES
function list_all_movies(req, res) {
    const top = parseInt(req.query.top);
    let movie = movies;
    if (top) {
        console.log(req.query);
        movie = movie.slice(0, top);
    }
    res.send(movie);
}

// GET MOVIE BY ID
function get_by_id(req, res) {
    console.log(req.params);
    const movie = movies.find(movie => movie.id === parseInt(req.params.id));
    if (!movie)
        res.status(400).send(`Movie with id ${req.params.id} not found`);
    else
        res.send(movie);
}

// UPDATE MOVIE BY ID
function update_movie_by_id(req, res) {
    //Input Validation
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        year: Joi.string().required(),
        genre: Joi.string().required()
    });
    const result = schema.validate(req.body);
    if(result.error) {
        res.send(result.error.details);
    }
    else {
        const movie = movies.find(movie => movie.id === parseInt(req.params.id));
        if (!movie)
            res.status(400).send(`Movie with id ${req.params.id} not found`);
        else {
            console.log(req.params);
            movie.name = req.body.name;
            movie.year = req.body.year;
            movie.genre = req.body.genre;
            res.send(movies);
        }
    }
}

// GET BY ID AND YEAR (Multiple Params)
function get_by_id_year(req, res) {
    const movie = movies.find(movie => movie.id === parseInt(req.params.id) && movie.year === req.params.year);
    if (!movie)
        res.status(400).send(`Movie not found`);
    else
        res.send(movie);
}

// GET MOVIE BY GENRE (Query Params)
function get_movie_by_genre(req, res) {
    let top = req.query.top;
    const movie = movies.filter(x => x.genre === req.params.genre);
    if (movie.length < 0)
        res.status(400).send(`Movies not found`);
    else
        if (top)
            movie.slice(0, top + 1);
        res.send(movie);
}

module.exports.create_a_movie = create_a_movie;
module.exports.list_all_movies = list_all_movies;
module.exports.get_by_id = get_by_id;
module.exports.update_movie_by_id = update_movie_by_id;
module.exports.get_by_id_year = get_by_id_year;
module.exports.get_movie_by_genre = get_movie_by_genre;