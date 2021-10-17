export default ({repo}, app) => {
// USER routes:
  app.get('/user', (req,res) => res.status(200).send('User is:',res.data) )
}
