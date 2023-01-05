const mongoose = require('mongoose');
const schema = mongoose.Schema({
    Team1Name :String,
    Team2Name :String,
    WinnerName :String,
    MatchDate :String
});

module.exports = mongoose.model("Matches",schema);