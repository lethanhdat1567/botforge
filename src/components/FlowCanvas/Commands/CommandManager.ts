import { Command } from "@/components/FlowCanvas/Commands/Command";

class CommandManager {
    private undoStack: Command[] = [];
    private redoStack: Command[] = [];

    execute(command: Command) {
        command.execute();
        this.undoStack.push(command);
        this.redoStack = [];
    }

    undo() {
        const cmd = this.undoStack.pop();
        if (!cmd) return;

        cmd.undo();
        this.redoStack.push(cmd);
    }

    redo() {
        const cmd = this.redoStack.pop();
        if (!cmd) return;

        cmd.execute();
        this.undoStack.push(cmd);
    }
}

export const commandManager = new CommandManager();
