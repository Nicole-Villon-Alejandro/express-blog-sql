const posts = require('../data/posts');

const connection = require('../data/db.js');

function index(req, res) {

    //variabile clone dell'array originale
    //let filteredPosts = posts;

    //res.pippo();

    //localhost:3000/api/posts?tags=Dolci
    //req.query.tags => valore della chiave tags nella uri
    //if (req.query.tags) {
        //riassegniamo i valori al clone
    //    filteredPosts = posts.filter(post => {
            //tags=Dolci
    //        return post.tags.includes(req.query.tags);
    //    });
    //}
    

    //res.json(filteredPosts);

    const sql = 'SELECT * FROM posts';
    connection.query(sql, (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.json(results)
    });


}

function show(req, res) {
    //localhost:3000/api/posts/2
    //params : 2
    /*const id = parseInt(req.params.id);

    const post = posts.find(post => post.id === id);

    if (!post) {
        res.status(404)

        return res.json(
            {
                status: 404,
                error: "Not Found",
                message: 'Post not found'
            }
        );
    }

    res.json(post);*/

    //mysql
    const {id} = req.params

    const sql = 'SELECT * FROM posts WHERE id = ?';

    connection.query(sql, [id], (err, results) =>{
        if (err) return res.status( 500 ).json({
            error: 'Database error SHOW'
        })

        if ( results.length === 0 ) return res.status(404).json({
            status: 404,
            error: "Not Found",
            message: "Post non trovato"
        })

        res.json(results[0])
    })








}

function store(req, res) {
    const newId = posts[posts.length - 1].id + 1;

    const newPost = {
        id: newId,
        title : req.body.title,
        content : req.body.content,
        image : req.body.image,
        tags : req.body.tags
    }

    posts.push(newPost);

    console.log(posts);

    res.status(201).json(newPost);
}

function update(req, res) {
    
    const id = parseInt(req.params.id);

    const post = posts.find(post => post.id === id);

    if (!post) {
        res.status(404)

        return res.json(
            {
                status: 404,
                error: "Not Found",
                message: 'Post not found'
            }
        );
    }

    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    console.log(posts);

    res.json(post);
}

function patch(req, res) {

}

function destroy(req, res) {
    //localhost:3000/api/posts/2
    //params : 2
   /* const id = parseInt(req.params.id);

    const post = posts.find(post => post.id === id);

    if (!post) {
        res.status(404)

        return res.json(
            {
                status: 404,
                error: "Not Found",
                message: 'Post not found'
            }
        );
    }

    posts.splice(posts.indexOf(post), 1);

    console.log(posts);

    res.sendStatus(204);*/

    const {id} = req.params;

    const sql = 'DELETE FROM posts WHERE id = ?'

    connection.query( sql, [id], (err) => {
        if(err) return res.status(500).json({
            error: 'Database query error'
        })

        res.sendStatus(204)
    } )


    
}

module.exports = { index, show, store, update, patch, destroy };