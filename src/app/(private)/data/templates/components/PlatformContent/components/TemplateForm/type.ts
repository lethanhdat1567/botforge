export type TemplateStatus = "draft" | "published";

export type TemplateFormData = {
    name: string;
    desc: string;
    status: TemplateStatus;
    pageId: string;
};
