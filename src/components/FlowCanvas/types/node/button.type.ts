type PostbackPayload = {
    variable: string;
    value: string;
};

type URLPayLoad = {
    url: string;
};

// Kiểu cho button riêng lẻ
export type ButtonNode =
    | {
          id: string;
          type: "postback";
          title: string;
          payload: PostbackPayload;
      }
    | {
          id: string;
          type: "url";
          title: string;
          payload: URLPayLoad;
      }
    | {
          id: string;
          type: "continue";
          title: string;
      };
