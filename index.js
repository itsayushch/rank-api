require('dotenv').config();
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

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
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(username, displayHexColor)
        .setDiscriminator(discriminator);

    const img = await rankCard.build();

    res.contentType('image/png');
    res.send(img);
});


app.listen(port, () => {
    return console.log(`App listening on port: ${port}`);
});