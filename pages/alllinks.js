import nextConnect from 'next-connect';
import { connectToDatabase } from '../middleware/database'

const handler = nextConnect();

// handler.use(middleware);

handler.post(async (req, res) => {
  const workspaceId = req.body.team_id;

  const { db } = await connectToDatabase();

  db.collection("hyperlinky-links").find({ id: workspaceId }).toArray((err, links) => {
    if (err) throw err;

    console.log(links)

    if (links.length != 0) {
      let linkString = ``;

      links.forEach((link) => {
        linkString += `${link.alias} -> ${link.link}\n`
      });

      res.send({
        response_type: "in_channel",
        text: linkString
      });
    } else {
      res.send({
        response_type: "in_channel",
        text: "No links in our database!"
      });
    }
  });
});

export default handler;
