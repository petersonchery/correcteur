const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../models/articles.js');

const ObjectId = mongoose.Types.ObjectId;

//home
router.get("/", (req, res) =>{
    res.render('index.ejs', {title: 'Home Page'});
});


router.get("/articles", async (req, res) => {
    try {
        const articles = await Article.find({});
        res.render("articles.ejs", { articles });
    } catch (error) {
        res.send(error.message);
    }
});


//compose
router.get("/compose", (req, res) => {
    res.render('compose.ejs', {title: 'Compose Page'});
});
//poster un article
router.post("/compose",  (req, res) => {
    const nouvelArticle = new Article({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        created: new Date()
    });
    
    // Pour enregistrer l'article dans la base de données :
    nouvelArticle.save()
        .then(article => {
            console.log("Article enregistré avec succès :", article);
            res.redirect('/articles'); // Rediriger vers la page 'articles.ejs'
        })
        .catch(error => {
            console.error("Erreur lors de l'enregistrement de l'article :", error);
            // Traitez l'erreur si nécessaire
        });
});

//about
router.get("/about", (req, res) => {
    res.render('about.ejs', {title: 'About Page'});
});

//community
router.get("/community", (req, res) => {
    res.render('community.ejs', {title:'Community Page'});
});

//contact
router.get("/contact", (req, res) => {
    res.render('contact.ejs', {title: 'Contact Page'});
});

//Route pour afficher un seul article en fonction de son id
router.get("/article/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        // Vérifiez si l'ID est un ObjectId valide
        if (!ObjectId.isValid(id)) {
            return res.status(400).send("ID d'article invalide.");
        }
        
        // Utilisez l'ID dans votre requête pour rechercher l'article
        const article = await Article.findOne({ _id: id });
        
        // Vérifiez si aucun article n'est trouvé avec cet ID
        if (!article) {
            return res.status(404).send("Aucun article trouvé avec cet ID.");
        }

        res.render("article.ejs", { article });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Route pour afficher le formulaire de modification d'un article

router.get('/edit/:id', async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).send('Article not found'); // Gérer le cas où l'article n'est pas trouvé
        }
        res.locals.article = article; // Définir locals.article avec l'article trouvé
        next(); // Passer à votre middleware suivant
    } catch (error) {
        next(error); // Passer l'erreur au middleware d'erreur
    }
});

router.get('/edit/:id', (req, res) => {
    res.render('edit_article.ejs', { title: 'Edit Article' }); // Rendre la vue avec locals.article disponible
});

// Route POST pour la mise à jour de l'article
router.post('/edit/:id', async (req, res) => {
    try {
        // Récupérez l'ID de l'article à mettre à jour à partir des paramètres de l'URL
        const articleId = req.params.id;

        // Récupérez les données mises à jour de l'article depuis le corps de la demande
        const updatedArticleData = req.body;

        // Mettez à jour l'article dans la base de données en utilisant l'ID et les données mises à jour
        const updatedArticle = await Article.findByIdAndUpdate(articleId, updatedArticleData, { new: true });

        // Redirigez l'utilisateur vers une page de confirmation ou une autre page appropriée
        res.redirect('/articles'); // Redirigez l'utilisateur vers la liste des articles par exemple
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'article :', error);
        res.send('Une erreur est survenue lors de la mise à jour de l\'article.');
    }
});

module.exports = router;

router.delete('/delete/:id', async (req, res) => {
    try {
        const articleToDelete = await Article.findOneAndDelete({ _id: req.params.id });
        if (!articleToDelete) {
            return res.status(404).send("Article not found.");
        }
        console.log(`Article supprimé : ${articleToDelete.title}`);
        res.redirect('/articles');
    } catch (error) {
        console.error("Erreur lors de la suppression de l'article :", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/delete/:id', async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).send('Article not found'); // Gérer le cas où l'article n'est pas trouvé
        }
        res.locals.article = article; // Définir locals.article avec l'article trouvé
        next(); // Passer à votre middleware suivant
    } catch (error) {
        next(error); // Passer l'erreur au middleware d'erreur
    }
});


router.get('/delete/:id', (req, res) => {
    res.render('delete_article.ejs', { title: 'Delete Article' }); // Rendre la vue avec locals.article disponible
});


// Route POST pour la suppression de l'article
router.post('/delete/:id', async (req, res) => {
    try {
        // Récupérez l'ID de l'article à supprimer à partir des paramètres de l'URL
        const articleId = req.params.id;

        // Supprimez l'article de la base de données en utilisant l'ID
        await Article.findByIdAndDelete(articleId);

        // Redirigez l'utilisateur vers une page de confirmation ou une autre page appropriée
        res.redirect('/articles'); // Redirigez l'utilisateur vers la liste des articles par exemple
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'article :', error);
        res.send('Une erreur est survenue lors de la suppression de l\'article.');
    }
});

router.get('/login', (req, res) => {
    res.render('login.ejs' , { title: 'Connexion' });
});

router.post('login' ,(req,res)=>{
    
    let username=req.body.username;
    let password=req.body.password; 

    User.authenticate(username,password,(err,user)=> {
        
        if(err || !user){
            
           return res.send({auth:false, message:'No user found.'}) 
           
        }else{
             
          req.session.userId = user.id;
          return res.send({auth:true, id:user.id, username:user.username}); 
        }
    })
});

module.exports = router;