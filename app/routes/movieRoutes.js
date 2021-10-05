var movieController = require('../controller/movieController');

function routeHandler(router) {
    
    router.route('/movies')
        .get(movieController.list_all_movies)
        .post(movieController.create_a_movie);

    router.route('/movies/:id')
        .get(movieController.get_by_id)
        .put(movieController.update_movie_by_id)
        //.delete(movieController.delete_a_movieById);
    
    router.route('/movies/:id/:year')
        .get(movieController.get_by_id_year)
}

module.exports.routeHandler = routeHandler;