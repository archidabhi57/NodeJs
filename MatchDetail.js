const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Matches = require('./Model/Matches');

mongoose.connect('mongodb+srv://archi:archi@cluster0.tiwngdq.mongodb.net/MatchesDemo?retryWrites=true&w=majority').then(()=>{
    const app = express();
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(cors());
    app.get('/Matches', async (req,res)=>{
        const data= await Matches.find();
        res.send(data);
    });

    app.get('/Matches/:id',async(req,res)=>{
        const data = await Matches.findOne({MouseId : req.params.id});
        res.send(data);
    });

    app.post('/Match', async(req,res)=>{
        const mac = new Matches();
        mac.Team1Name = req.body.T1N;
        mac.Team2Name = req.body.T2N;
        mac.WinnerName = req.body.WN;
        mac.MatchDate = req.body.MD;
        mac.MatchScore = req.body.MS;

        const data = await mac.save();
        res.send(data);
    });

    app.put('/Match',async(req,res)=>{
        const data = await Matches.findOne({MatchId: req.params.id});
        data.Team1Name = req.body.T1N;
        data.Team2Name = req.body.T2N;
        data.WinnerName = req.body.WN;
        data.MatchDate = req.body.MD;

        await data.save();
        res.send(data);
    });

    app.delete('/Match/:id',async(req,res)=>{
        const data = await Matches.deleteOne({MatchId: req.params.id});
        res.send(data);
    });

    app.listen(5083,()=>{
        console.log("Server started at @ 5083");
    });

});