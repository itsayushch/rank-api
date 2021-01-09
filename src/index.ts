import Env from 'dotenv';
Env.config();
import express, { Request, Response } from 'express';
import canvacord from 'canvacord';
import bodyParser from 'body-parser';

interface Body {
    avatar: string;
    exp: number;
    level: number;
    nextLevelXp: number;
    rank: number;
    presence: 'online' | 'idle' | 'dnd' | 'offline' | 'streaming';
    username: string;
    displayHexColor: string;
    discriminator: number | string;
}

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    return res.json({ success: true });
});

app.post('/', async (req: Request, res: Response) => {
    const { avatar, exp, level, nextLevelXp, rank, presence, username, displayHexColor, discriminator }: Body = req.body;

    const rankCard = new canvacord.Rank()
        .setAvatar(avatar)
        .setCurrentXP(exp)
        .setLevel(level)
        .setRequiredXP(nextLevelXp)
        .setRank(rank)
        .setStatus(presence)
        .setFontSize('26px')
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
