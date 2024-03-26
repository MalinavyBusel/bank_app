import { CliHandler } from "./modules/CLI/CliHandler.js";
import { CliCommandParser } from "./modules/CliCommandParser/CliCommandParser.js";
import { BankCreate } from "./modules/Command/Bank/Create.js";
import { Factory } from "./modules/Command/Factory.js";
import { CommandInterpreter } from "./modules/CommandInterpreter/CommandInterpreter.js";

function main() {
    const cli = new CliHandler();
    const command_parser = new CliCommandParser();
    const factory = new Factory(new BankCreate());
    const interpreter = new CommandInterpreter(cli, command_parser, factory);
    interpreter.start();
}

main();
