import nextConnect from 'next-connect';
import middleware from '../../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const workspaceId = req.body.team_id;
  const alias = req.body.text;

  req.db.collection("hyperlinky-links").findOneAndDelete({ id: workspaceId, alias }, (err, link) => {
    if (err) throw err;

    res.send({
      response_type: "in_channel",
      text: link.value ? `Successfully deleted "${alias}"!` : `Link with alias "${alias}" doesn't exist.`
    });
  });
});

export default handler;
