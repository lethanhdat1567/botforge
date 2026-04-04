function ContactForm() {
    return (
        <div className="border-border bg-card mx-auto mt-10 w-full max-w-xl rounded-2xl border px-4 py-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] sm:px-8 sm:py-8 dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.45)]">
            <form className="space-y-6">
                {/* Họ tên */}
                <div>
                    <label className="text-foreground mb-2 block text-sm font-medium">
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        className="border-input bg-background text-foreground focus-visible:border-ring focus-visible:ring-ring/30 w-full rounded-lg border px-4 py-3 text-sm transition outline-none focus-visible:ring-2"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="text-foreground mb-2 block text-sm font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        className="border-input bg-background text-foreground focus-visible:border-ring focus-visible:ring-ring/30 w-full rounded-lg border px-4 py-3 text-sm transition outline-none focus-visible:ring-2"
                    />
                </div>

                {/* Nội dung */}
                <div>
                    <label className="text-foreground mb-2 block text-sm font-medium">
                        Nội dung
                    </label>
                    <textarea
                        placeholder="Nhập nội dung bạn muốn trao đổi..."
                        rows={4}
                        className="border-input bg-background text-foreground focus-visible:border-ring focus-visible:ring-ring/30 w-full resize-none rounded-lg border px-4 py-3 text-sm transition outline-none focus-visible:ring-2"
                    />
                </div>

                {/* Nút gửi */}
                <button
                    type="submit"
                    className="bg-foreground text-background w-full rounded-xl py-3 text-sm font-medium shadow-[0_12px_30px_-10px_rgba(0,0,0,0.25)] transition hover:opacity-90 active:scale-[0.98] dark:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)]"
                >
                    Gửi liên hệ
                </button>

                {/* Chú thích */}
                <p className="text-muted-foreground text-center text-xs leading-relaxed">
                    Khi gửi biểu mẫu này, bạn đồng ý nhận phản hồi qua email từ
                    đội ngũ Botforge. Thông tin của bạn luôn được bảo mật —
                    không spam.
                </p>
            </form>
        </div>
    );
}

export default ContactForm;
