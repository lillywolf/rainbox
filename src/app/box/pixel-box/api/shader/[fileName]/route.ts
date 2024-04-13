import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);

  const fileName = pathname.split('/')[5];
  const route = path.resolve(`./src/app/box/pixel-box/java/${ fileName }`);
  const file = await fs.readFile(route, { encoding: 'utf8' });

  return Response.json(file);
}
