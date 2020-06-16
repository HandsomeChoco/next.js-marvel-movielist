// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDB, Movies } from '../../../model';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
      externalResolver: true,
    },
  },
}

connectDB();

export default async(req, res) => {
  if(req.method === 'GET') {
    const {
      query: { movieList },
    } = req
    
    var getMovie = await Movies.find({ title: { $regex: `${req.query}` } });

    if(getMovie.length>=1) {
      res.status = 200;
      resJson(getMovie);
    } else 
    return res.status(400).send('no result');
  }

}

var resJson = function(param) {
  return res.json({ document: param });
}