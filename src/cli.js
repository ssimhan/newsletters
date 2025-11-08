import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ingestSubstack } from './sources/substack.js';

const argv = yargs(hideBin(process.argv))
  .command('substack', 'Ingest a Substack RSS feed', y =>
    y.option('feed', { type: 'string', demandOption: true, describe: 'Substack RSS feed URL' })
  )
  .demandCommand(1)
  .help()
  .argv;

const run = async () => {
  const cmd = argv._[0];

  if (cmd === 'substack') {
    await ingestSubstack(argv.feed);
  }
};

run().catch(err => {
  console.error('CLI error:', err);
  process.exit(1);
});
