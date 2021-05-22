import * as http from 'http';
import data from './data-store';

const PORT = 8000;

let projects = data;
const server = http.createServer((req, res) => {
  const { method, url } = req;

  let bodyChunk: Uint8Array[] = [];
  req.on('error', () => {
    res.end({"message" : "BAD REQUEST"});
  }).on('data', (chunk) => {
    bodyChunk.push(chunk);
  }).on('end', () => {
    const body = Buffer.concat(bodyChunk).toString();
    
    if (url !== '/projects') {
      res.writeHead(404);
      res.end();
    }

    if (method === 'POST') {
      try {
        const json = JSON.parse(body);
        if (Object.keys(json).length === 2 && typeof json.id === 'number' && typeof json.name === 'string') {
          if (projects.map(({ id }) => id).includes(json.id)) 
            throw new Error();

          projects = [...projects, json];
          res.writeHead(201);
        } else {
          throw new Error();
        }
      } catch (e) {
        res.writeHead(400);
        res.end("{\"message\" : \"BAD REQUEST\"}");
      }
    }

    res.end(JSON.stringify(projects))
  });
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})