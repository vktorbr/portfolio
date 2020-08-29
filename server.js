const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const videos = require('./data')

server.use(express.static('public'));

server.set('view engine', 'njk');

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

//rotas
server.get('/', function(req, res){
    const about = {
        avatar_url: 'https://avatars1.githubusercontent.com/u/33494087?s=460&u=8956e4ac4beec29c0e2b9c60c01f12d6472160c3&v=4',
        name: 'VKtor Mrtins',
        role: 'Natural Bodybuilder',
        description: 'Programador full-stack, bodybuilder e data scientist',
        links: [
            { name: 'Github', url: 'https://github.com/vktorbr'},
            { name: 'Twitter', url: 'https://twitter.com/vktorbr'},
            { name: 'Instagram', url: 'https://instagram.com/victornelas'}
        ]
    }

    return res.render('about', {about});
})

server.get('/portfolio', function(req, res){
    return res.render('portfolio', {items: videos});
})

server.get('/video', function(req, res){
    const id = req.query.id;

    const video = videos.find(function(video){
        return video.id == id;
    })

    if(!video){
        return res.send("video not found");
    }

    res.render('video', {item: video});
})

server.listen(5000, function(){
    console.log('server is running');
})