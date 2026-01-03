"use client";

import ButtonDialog from "@/components/FlowCanvas/Nodes/BasicComp/Button/components/ButtonDialog/ButtonDialog";
import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button as ButtonUI } from "@/components/ui/button";

type Props = {
    btn: ButtonNode;
    onChange: (btn: ButtonNode) => void;
    onDestroyBtn: (btnId: string) => void;
};

function Button({ btn, onChange, onDestroyBtn }: Props) {
    const inputRef = useRef<HTMLDivElement>(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [buttonInput, setButtonInput] = useState(btn.title);
    const debounceInput = useDebounce(buttonInput, 300);
    const isError = !btn.title?.trim();

    useEffect(() => {
        const btnData = {
            ...btn,
            title: debounceInput,
        };

        onChange(btnData);
    }, [debounceInput]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowTooltip(false);
            }
        }

        window.addEventListener("mousedown", handleClickOutside, true);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside, true);
        };
    }, []);

    return (
        <div className="group/btn relative" ref={inputRef}>
            <Input
                className={cn(
                    "w-full ring-0!",
                    isError && "border-red-300 focus:border-red-500!",
                )}
                value={buttonInput}
                onChange={(e) => setButtonInput(e.target.value)}
                onFocus={() => setShowTooltip(true)}
            />

            {/* Tooltip */}
            <ButtonDialog
                showTooltip={showTooltip}
                btn={btn}
                onChange={onChange}
            />

            <ButtonUI
                variant={"outline"}
                className="absolute top-0 left-1/2 hidden -translate-x-1/2 -translate-y-full group-hover/btn:block"
                onClick={() => onDestroyBtn(btn.id)}
            >
                <Trash />
            </ButtonUI>
        </div>
    );
}

export default Button;
