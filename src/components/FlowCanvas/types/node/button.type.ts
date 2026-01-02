type ButtonPayload = {
    key?: string;
    value?: string;
    next?: string;
};

// Kiểu cho button riêng lẻ
export type ButtonNode =
    | {
          type: "postback";
          title: string;
          payload: ButtonPayload;
      }
    | {
          type: "url";
          title: string;
          url: string;
      };

export type QuickReply = {
    title: string;
    payload: ButtonPayload;
};
