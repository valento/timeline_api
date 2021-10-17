export default ({repo}, app) => {
// TIMELINE routes:
  app.get('/tmln/list/', (req,res) => res.status(200).send('Show List of Timelines') )
  app.get('/tmln/line/:id', (req,res) => res.status(200).send(`Show this Timeline: ${req.params.id}`) )
  app.get('/tmln/line/time/:id', (req,res) => res.status(200).send(`Show Line at: ${req.params.id}`) )
// general route:
  app.get('/tmln/*', (req,res) => res.status(200).send('Time API\'s here') )
}
