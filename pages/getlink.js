import nextConnect from 'next-connect';
import middleware from '../../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const workspaceId = req.body.team_id;
  const alias = req.body.text;
  const link = await req.db.collection("hyperlinky-links").findOne({ id: workspaceId, alias });

  if (link) {
    res.send({
      response_type: "in_channel",
      text: link.link
    });
  } else {
    res.send({
      response_type: "in_channel",
      text: "That link doesn't exist!"
    });
  }
});

export default handler;
