import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ingestSubstack } from './sources/substack.js';
import { ingestPodcast } from './sources/podcast.js';

const argv = yargs(hideBin(process.argv))
  .command('substack', 'Ingest a Substack RSS feed', y =>
    y.option('feed', { type: 'string', demandOption: true })
  )
  .command('podcast', 'Ingest a Podcast RSS feed', y =>
    y.option('feed', { type: 'string', demandOption: true })
  )
  .demandCommand(1)
  .help()
  .argv;

const run = async () => {
  const cmd = argv._[0];

  if (cmd === 'substack') {
    await ingestSubstack(argv.feed);
  } else if (cmd === 'podcast') {
    await ingestPodcast(argv.feed);
  }
};

run().catch(err => {
  console.error('CLI error:', err);
  process.exit(1);
});
