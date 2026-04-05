type PostbackPayload = {
    key: string;
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
    | { type: "postback"; payload: PostbackPayload }
    | { type: "web_url"; payload: URLPayLoad }
    | { type: "continue"; payload: { next?: string } }
) &
    BaseButton;
