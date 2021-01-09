import express, { Application, Request, Response } from 'express';
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

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/', async (req: Request, res: Response) => {
    const { avatar, exp, level, nextLevelXp, rank, presence, username, displayHexColor, discriminator }: Body = req.body;

    const rankCard = new canvacord.Rank()
        .setAvatar(avatar)
        .setCurrentXP(exp)
        .setLevel(level)
        .setRequiredXP(nextLevelXp)
        .setRank(rank)
        .setStatus(presence)
        .setFontSize(26)
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
    app.listen(3000, () => {
        return console.log('Ready!');
    });
}