import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    AccordionHeader,
} from "@/components/animate-ui/primitives/radix/accordion";
import { Plus } from "lucide-react";

function Questions() {
    const ITEMS = [
        {
            title: "What is Animate UI?",
            content:
                "Animate UI is an open-source distribution of React components built with TypeScript, Tailwind CSS, and Motion.",
        },
        {
            title: "How is it different from other libraries?",
            content:
                "Instead of installing via NPM, you copy and paste the components directly. This gives you full control to modify or customize them as needed.",
        },
        {
            title: "Is Animate UI free to use?",
            content:
                "Absolutely! Animate UI is fully open-source. You can use, modify, and adapt it to fit your needs.",
        },
    ];

    return (
        <div className="mx-auto flex w-5xl flex-col items-center pt-30">
            <h1 className="w-xl text-center text-5xl font-medium">
                Got questions? <br /> We get that
            </h1>
            <div className="mt-10 w-full">
                <Accordion type={"multiple"} className="w-full space-y-4">
                    {ITEMS.map((item, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index + 1}`}
                            className="rounded-md px-3 py-1 shadow-[0_18px_45px_-12px_rgba(0,0,0,0.3)]"
                        >
                            <AccordionHeader>
                                <AccordionTrigger className="flex w-full cursor-pointer items-center justify-between border-b-0 py-2 text-start">
                                    {item.title}{" "}
                                    <Plus className="h-5 w-5 text-neutral-500 transition-transform duration-300" />
                                </AccordionTrigger>
                            </AccordionHeader>
                            <AccordionContent>
                                <div className="text-muted-foreground py-2 text-sm">
                                    {item.content}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}

export default Questions;
