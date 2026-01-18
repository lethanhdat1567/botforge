import { Command } from "@/components/FlowCanvas/Commands/Command";

class CommandManager {
    private undoStack: Command[] = [];
    private redoStack: Command[] = [];

    execute(command: Command) {
        console.log("Exercute: ", command);

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

    get undoCount() {
        return this.undoStack.length;
    }

    get redoCount() {
        return this.redoStack.length;
    }

    // (optional)
    canUndo() {
        return this.undoStack.length > 0;
    }

    canRedo() {
        return this.redoStack.length > 0;
    }
}

export const commandManager = new CommandManager();
