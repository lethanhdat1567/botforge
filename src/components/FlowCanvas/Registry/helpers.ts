import { uploadService } from "@/services/uploadService";

export function removeMessageMedia(message: any) {
    if (!message?.type || !message?.fields) return;

    switch (message.type) {
        case "image":
        case "video":
        case "audio": {
            const url = message.fields.url;
            if (url) uploadService.deleteFile(url);
            break;
        }

        case "media_template": {
            const mediaUrl = message.fields.media_url;
            if (mediaUrl) uploadService.deleteFile(mediaUrl);
            break;
        }

        case "generic_template": {
            const elements = message.fields.elements;
            if (Array.isArray(elements)) {
                elements.forEach((el) => {
                    if (el.image_url) {
                        uploadService.deleteFile(el.image_url);
                    }
                });
            }
            break;
        }
    }
}
