// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Greeting } from 'types/Greeting';

export default (req: any, res: any) => {
  const greeting: Greeting = { greeting: 'Hello, world!' };
  // Open Chrome DevTools to step through the debugger!
  // debugger;
  res.status(200).json({ greeting: 'Hello, world!' });
};
