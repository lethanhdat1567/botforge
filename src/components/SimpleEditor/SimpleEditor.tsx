"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import {
    Bold,
    Italic,
    UnderlineIcon,
    List,
    ListOrdered,
    Undo,
    Redo,
    AlignLeft,
    AlignCenter,
    AlignRight,
    ImageIcon,
    Link2,
    Unlink2,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { uploadService } from "@/services/uploadService"; // Dùng service của bạn
import { resolveMediaSrc } from "@/lib/image";
import { toast } from "sonner";
import ImageResize from "tiptap-extension-resize-image";

type Props = {
    value?: string;
    onChange: (value: string) => void;
    className?: string;
};

// --- Component Nút bấm tối giản ---
const ToolbarButton = ({
    onClick,
    isActive,
    disabled,
    children,
    loading,
}: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    loading?: boolean;
}) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled || loading}
        className={cn(
            "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
            "hover:bg-muted hover:text-foreground text-neutral-600",
            isActive && "bg-secondary text-secondary-foreground font-semibold",
            (disabled || loading) && "cursor-not-allowed opacity-40",
        )}
    >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </button>
);

// --- Divider ngăn cách ---
const Divider = () => <div className="bg-border/60 mx-1.5 h-4 w-[1px]" />;

export function SimpleEditor({ value, onChange, className }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline, // Thêm gạch chân
            Placeholder.configure({
                placeholder: "Write something interesting...",
            }),
            // Cấu hình Căn lề (Mặc định là left)
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            // Cấu hình Link (Tự động nhận diện link)
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-primary underline underline-offset-4 cursor-pointer",
                },
            }),
            // Cấu hình Ảnh
            ImageResize.configure({
                inline: false,
            }),
        ],
        content: value,
        immediatelyRender: false, // Fix SSR
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                // proset Prose để style bài viết đẹp hơn
                class: "focus:outline-none h-[500px]   overflow-y-auto px-4 py-3 text-sm prose prose-sm max-w-none scrollbar-hide",
            },
        },
    });

    // --- Logic Upload Ảnh vào Editor ---
    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (!file || !editor) return;

        // Validate nhẹ nhàng
        if (!file.type.startsWith("image/")) {
            toast.error("Vui lòng chọn file ảnh");
            return;
        }

        try {
            setIsUploading(true);

            // Gọi API upload của bạn
            const res = await uploadService.uploadFile(file);

            // Chèn ảnh vào vị trí con trỏ chuột
            const url = resolveMediaSrc(res.path);
            editor
                .chain()
                .focus()
                .setImage({ src: String(url) })
                .run();

            toast.success("Đã chèn ảnh");
        } catch (error) {
            toast.error("Upload ảnh thất bại");
        } finally {
            setIsUploading(false);
            // Reset file input để có thể upload cùng 1 file ảnh lần sau
            if (e.target) e.target.value = "";
        }
    };

    // --- Logic Chèn Link ---
    const setLink = () => {
        if (!editor) return;
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        // Cancelled
        if (url === null) return;

        // Empty
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        // Set link
        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    };

    if (!editor) return null;

    return (
        <div
            className={cn(
                "border-input bg-background w-full overflow-hidden rounded-md border shadow-sm",
                className,
            )}
        >
            {/* Toolbar - Dẹt, gọn, vibe Trắng/Xám */}
            <div className="flex flex-wrap items-center gap-0.5 border-b bg-neutral-50 p-1.5">
                {/* Undo/Redo */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                >
                    <Undo size={16} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                >
                    <Redo size={16} />
                </ToolbarButton>

                <Divider />

                {/* Định dạng cơ bản */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive("bold")}
                >
                    <Bold size={16} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive("italic")}
                >
                    <Italic size={16} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                    isActive={editor.isActive("underline")}
                >
                    <UnderlineIcon size={16} />
                </ToolbarButton>

                <Divider />

                {/* Căn lề */}
                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().setTextAlign("left").run()
                    }
                    isActive={editor.isActive({ textAlign: "left" })}
                >
                    <AlignLeft size={16} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().setTextAlign("center").run()
                    }
                    isActive={editor.isActive({ textAlign: "center" })}
                >
                    <AlignCenter size={16} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().setTextAlign("right").run()
                    }
                    isActive={editor.isActive({ textAlign: "right" })}
                >
                    <AlignRight size={16} />
                </ToolbarButton>

                <Divider />

                {/* List */}
                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    isActive={editor.isActive("bulletList")}
                >
                    <List size={16} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    isActive={editor.isActive("orderedList")}
                >
                    <ListOrdered size={16} />
                </ToolbarButton>

                <Divider />

                {/* Chèn Ảnh & Link */}
                <ToolbarButton
                    onClick={() => fileInputRef.current?.click()}
                    loading={isUploading}
                    isActive={editor.isActive("image")}
                >
                    <ImageIcon size={16} />
                </ToolbarButton>
                {/* Ẩn file input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                />

                <ToolbarButton
                    onClick={setLink}
                    isActive={editor.isActive("link")}
                >
                    <Link2 size={16} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    disabled={!editor.isActive("link")}
                >
                    <Unlink2 size={16} />
                </ToolbarButton>
            </div>

            {/* Vùng soạn thảo - Tăng min-height lên 120px để dễ nhìn hơn */}
            <div className="scrollbar-hide">
                <EditorContent editor={editor} />
            </div>

            {/* Global CSS cho Prose và Placeholder */}
            <style jsx global>{`
                .prose strong {
                    font-weight: 700 !important;
                }
                .tiptap p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #adb5bd;
                    pointer-events: none;
                    height: 0;
                }
            `}</style>
        </div>
    );
}
