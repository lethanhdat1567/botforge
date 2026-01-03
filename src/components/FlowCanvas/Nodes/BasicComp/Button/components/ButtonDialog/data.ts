const options = [
    { value: "continue", label: "Tiếp tục flow" },
    { value: "url", label: "Chèn URL" },
    { value: "postback", label: "Chèn dữ liệu" },
];

const titleMap: Record<string, string> = {
    continue: "Tiếp tục flow",
    url: "Chèn URL",
    postback: "Chèn dữ liệu",
};

export { options, titleMap };
