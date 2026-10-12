export default async (req, res) => {
  const { reqHandler } = await import('../dist/delices-tp/server/server.mjs');
  return reqHandler(req, res);
};

