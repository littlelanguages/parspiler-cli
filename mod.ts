import * as CLI from "https://raw.githubusercontent.com/littlelanguages/deno-lib-console-cli/0.1.2/mod.ts";

import { denoCommand } from "https://raw.githubusercontent.com/littlelanguages/parspiler-tool-deno/0.0.3/mod.ts";
import { command as kotlinCommand } from "https://raw.githubusercontent.com/littlelanguages/parspiler-tool-kotlin/0.0.3/mod.ts";

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
    help: "The name of the file that is to be processed.",
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

const kotlinCmd = new CLI.ValueCommand(
  "kotlin",
  "Create a parser for the passed syntax definition in Kotlin",
  [
    new CLI.ValueOption(
      ["--directory", "-d"],
      "Value is the directory into which the generated Kotlin and library code is placed.  Defaults to the source file's directory.",
    ),
    new CLI.ValueOption(
      ["--package", "-p"],
      "Value is the package name into which the generated Kotlin code is to be placed.",
    ),
    new CLI.ValueOption(
      ["--scannerPackage", "-sp"],
      "Value is the package name into which the generated scanner Kotlin code is to be placed.  If this is not set it defaults to package's value.",
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
    help: "The name of the file that is to be processed.",
  },
  (
    _: CLI.Definition,
    file: string | undefined,
    vals: Map<String, unknown>,
  ) => {
    kotlinCommand(
      file!,
      {
        directory: vals.get("directory") as string | undefined,
        scannerPackage: vals.get("scannerPackage") as string | undefined,
        parserPackage: vals.get("package") as string,
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
  cmds: [denoCmd, kotlinCmd, CLI.helpCmd],
};

CLI.process(cli);
