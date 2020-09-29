import nextConnect from 'next-connect';
import middleware from '../../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const text = req.body.text.split(/\s+/);
  const author = req.body.user_name;
  const workspaceId = req.body.team_id;

  const link = text.pop();
  const alias = text.join(" ");

  // Checking if alias is taken already
  const existingLink = await req.db.collection("hyperlinky-links").findOne({ id: workspaceId, alias });

  if (existingLink == null) {
    await req.db.collection("hyperlinky-links").save({
      id: workspaceId, alias, link
    });

    res.send({
      response_type: "in_channel",
      text: `Created link "${alias}" with value ${link}!`
    });
  } else {
    res.send({
      response_type: "in_channel",
      text: `The alias "${alias}" is already taken, please use a different one.`
    });
  }
});

export default handler;
