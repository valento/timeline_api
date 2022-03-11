export default ({repo}, app) => {
// TIMELINE routes:
  app.get('/api/tmln/list/', (req,res) => res.status(200).send('Show List of Timelines') )
// single timeline:
  app.get('/api/tmln/line/:id', (req,res) => res.status(200).send(`Show this Timeline: ${req.params.id}`) )
  app.get('/api/tmln/line/time/:id', (req,res) => res.status(200).send(`Show Line at: ${req.params.id}`) )
// general route:
  app.get('/api/tmln/*', (req,res) => res.status(200).send('Time API\'s here') )
}
