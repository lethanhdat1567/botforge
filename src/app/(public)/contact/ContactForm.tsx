function ContactForm() {
    return (
        <div className="mx-auto mt-10 w-full max-w-xl rounded-2xl border border-border bg-card p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.45)]">
            <form className="space-y-6">
                {/* Họ tên */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        placeholder="Nguyễn Văn A"
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground transition outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="email@domain.com"
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground transition outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                    />
                </div>

                {/* Nội dung */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Nội dung
                    </label>
                    <textarea
                        placeholder="Nhập nội dung bạn muốn trao đổi..."
                        rows={4}
                        className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground transition outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                    />
                </div>

                {/* Nút gửi */}
                <button
                    type="submit"
                    className="w-full rounded-xl bg-foreground py-3 text-sm font-medium text-background shadow-[0_12px_30px_-10px_rgba(0,0,0,0.25)] transition hover:opacity-90 active:scale-[0.98] dark:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)]"
                >
                    Gửi liên hệ
                </button>

                {/* Chú thích */}
                <p className="text-center text-xs leading-relaxed text-muted-foreground">
                    Khi gửi biểu mẫu này, bạn đồng ý nhận phản hồi qua email từ
                    đội ngũ Botforge. Thông tin của bạn luôn được bảo mật —
                    không spam.
                </p>
            </form>
        </div>
    );
}

export default ContactForm;
