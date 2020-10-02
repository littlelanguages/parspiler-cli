import * as CLI from "https://raw.githubusercontent.com/littlelanguages/deno-lib-console-cli/0.1.1/mod.ts";

import { denoCommand } from "https://raw.githubusercontent.com/littlelanguages/parspiler-tool-deno/0.0.1/mod.ts";

const denoCmd = new CLI.ValueCommand(
  "deno",
  "Create a parser for the passed syntax definition in Deno Typescript",
  [
    new CLI.ValueOption(
      ["--scanner", "-s"],
      "Value is the pathed name of the generated scanner.  Defaults to FileName-scanner.ts",
    ),
    new CLI.ValueOption(
      ["--parser", "-p"],
      "Value is the pathed name of the generated parser.  Defaults to FileName-parser.ts",
    ),
    new CLI.FlagOption(
      ["--force", "-f"],
      "Ignore all the file dates and force a regeneration of all generated sources.",
    ),
    new CLI.FlagOption(
      ["--verbose", "-v"],
      "Lists all the files as they are created.",
    ),
  ],
  {
    name: "FileName",
    optional: false,
    help: "The name of the file the is to be processed.",
  },
  (
    _: CLI.Definition,
    file: string | undefined,
    vals: Map<String, unknown>,
  ) => {
    denoCommand(
      file!,
      {
        scannerOutputFileName: vals.get("scanner") as string | undefined,
        parserOutputFileName: vals.get("parser") as string | undefined,
        force: vals.get("force") as boolean | false,
        verbose: vals.get("verbose") as boolean | false,
      },
    );
  },
);

const cli = {
  name: "parspiler",
  help: "Validate and compile a parser definition into executable code",
  options: [CLI.helpFlag],
  cmds: [denoCmd, CLI.helpCmd],
};

CLI.process(cli);
