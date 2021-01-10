require('dotenv').config();
const express = require('express');
const app = express();

const canvacord = require("canvacord");
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
const { wakeUp } = require('./wakeup');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.json({ success: true });
});

app.post('/', async (req, res) => {
    const { avatar, exp, level, nextLevelXp, rank, presence, username, displayHexColor, discriminator } = req.body;

    const rankCard = new canvacord.Rank()
        .setAvatar(avatar)
        .setCurrentXP(exp)
        .setLevel(level)
        .setRequiredXP(nextLevelXp)
        .setRank(rank)
        .setStatus(presence)
        .setProgressBar(displayHexColor, "COLOR")
        .setOverlay('#FFFFFF', 0) 
        .setBackground('COLOR', '#23272a')
        .setUsername(username, displayHexColor)
        .setDiscriminator(discriminator);

    const img = await rankCard.build();

    res.contentType('image/png');
    res.send(img);
});


app.listen(port, () => {
    wakeUp();
    return console.log(`App listening on port: ${port}`);
});