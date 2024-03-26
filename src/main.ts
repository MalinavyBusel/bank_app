import { CliHandler } from "./modules/CLI/CliHandler.js";
import { CommandInterpreter } from "./modules/CommandInterpreter/CommandInterpreter.js";

function main() {
    const cli = new CliHandler()
    const interpreter = new CommandInterpreter(cli)
    interpreter.start()
}

main()
