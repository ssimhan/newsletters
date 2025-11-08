// src/cli.js
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { ingestSubstack } from "./sources/substack.js";
import { ingestPodcast } from "./sources/podcast.js";
import ingestWeb from "./sources/web.js";

const commitBranch = process.env.GITHUB_DEFAULT_BRANCH || "main";
const commitAuthor = { name: "Auto-Ingest", email: "actions@users.noreply.github.com" };

yargs(hideBin(process.argv))
  .scriptName("ingest")
  .command(
    "substack",
    "Ingest a Substack RSS feed",
    (y) => y.option("feed", { type: "string", demandOption: true, describe: "Substack RSS feed URL" }),
    async (argv) => {
      await ingestSubstack(argv.feed);
      console.log("SUBSTACK OK");
    }
  )
  .command(
    "podcast",
    "Ingest a Podcast RSS feed",
    (y) => y.option("feed", { type: "string", demandOption: true, describe: "Podcast RSS feed URL" }),
    async (argv) => {
      await ingestPodcast(argv.feed);
      console.log("PODCAST OK");
    }
  )
  .command(
    "web",
    "Ingest a single web page into /web/",
    (y) => y.option("url", { type: "string", demandOption: true, describe: "Web page URL" }),
    async (argv) => {
      const out = await ingestWeb({
        url: argv.url,
        commitBranch,
        commitAuthor,
      });
      console.log("WEB OK:", out);
    }
  )
  .demandCommand(1)
  .strict()
  .help()
  .wrap(100)
  .fail((msg, err) => {
    console.error("CLI error:", err || msg);
    process.exit(1);
  })
  .parseAsync()
  .catch((err) => {
    console.error("Unhandled CLI error:", err);
    process.exit(1);
  });