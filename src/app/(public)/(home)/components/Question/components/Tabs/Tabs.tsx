import TabItem from "./TabItem";

const data = [
    {
        question: "Is JobHub free to use for job seekers?",
        answer: "Yes! JobHub is completely free for job seekers. You can browse jobs, set up alerts, and apply directly - no hidden fees.",
    },
    {
        question: "Does JobHub offer live chat support?",
        answer: "Yes, 24/7 support is available across all platforms to assist you anytime.",
    },
    {
        question: "Do I need to code to use JobHub?",
        answer: "Absolutely not! Our platform is completely drag-and-drop, no coding required.",
    },
    {
        question: "Does JobHub use AI to suggest jobs?",
        answer: "Yes, AI helps you find relevant jobs and suggests them based on your profile.",
    },
    {
        question: "Can I share my job search flow?",
        answer: "Coming soon: You’ll be able to share flows with other users for collaboration.",
    },
];

export default function Tabs() {
    return (
        <div className="space-y-4">
            {data.map((item, index) => (
                <TabItem
                    key={index}
                    question={item.question}
                    answer={item.answer}
                />
            ))}
        </div>
    );
}
