// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Movie, User, connection } from '../../../model'

connection;
export default async(req, res) => {
  const { query: { movie } } = req;
  Movie;
  var getMovie = await Movie.find({ title: { $regex: movie }})
  res.json(getMovie);
}