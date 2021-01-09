import express, { Application, Request, Response } from 'express';
import canvacord from 'canvacord';
import bodyParser from 'body-parser';

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/', async (req: Request, res: Response) => {
    const { avatar, exp, level, nextLevelXp, rank, username, displayHexColor, discriminator } = req.body;

    const rankCard = new canvacord.Rank()
        .setAvatar(avatar)
        .setCurrentXP(exp)
        .setLevel(level)
        .setRequiredXP(nextLevelXp)
        .setRank(rank)
        .setStatus('dnd')
        .setFontSize('26px')
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(username, displayHexColor)
        .setDiscriminator(discriminator);

    const img = await rankCard.build();

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });
    res.end(img);
});

export const init = () => {
    app.listen(80, () => {
        return console.log('Ready!');
    });
}