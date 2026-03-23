type PostbackPayload = {
    variable: string;
    value: string;
    next?: string;
};

type URLPayLoad = {
    url: string;
    next?: string;
};

type BaseButton = {
    id: string;
    title: string;
};

export type ButtonNode = (
    | { type: "postback"; payload: PostbackPayload; children?: string }
    | { type: "url"; payload: URLPayLoad }
    | { type: "continue"; payload: { next?: string }; children?: string }
) &
    BaseButton;
