// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async(req, res) => {
  console.log('test')
  const { query: { movie } } = req;

  var getMovie = await movieModel.movie.find({ title: { $regex: movie }});
  res.statusCode = 200;
  res.json(getMovie);
}