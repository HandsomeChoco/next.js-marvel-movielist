// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDB, movieSchema, userSchema }from '../../../model';

connectDB();

export default async(req, res) => {
  const { query: { movie } } = req;
  res.send(`movie: ${movie}`)
}