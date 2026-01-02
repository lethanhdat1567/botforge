type ButtonPayload = {
    key?: string;
    value?: string;
    next?: string;
};

// Kiểu cho button riêng lẻ
export type ButtonNode =
    | {
          id: string;
          type: "postback";
          title: string;
          payload: ButtonPayload;
      }
    | {
          id: string;
          type: "url";
          title: string;
          url: string;
      };

export type QuickReply = {
    title: string;
    payload: ButtonPayload;
};
