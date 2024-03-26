import { CliHandler } from "./modules/CLI/CliHandler.js";
import { CliCommandParser } from "./modules/CliCommandParser/CliCommandParser.js";
import { CommandInterpreter } from "./modules/CommandInterpreter/CommandInterpreter.js";

function main() {
    const cli = new CliHandler();
    const command_parser = new CliCommandParser();
    const interpreter = new CommandInterpreter(cli, command_parser);
    interpreter.start();
}

main();
