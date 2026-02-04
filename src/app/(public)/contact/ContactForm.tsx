function ContactForm() {
    return (
        <div className="mx-auto mt-10 w-full max-w-xl rounded-2xl bg-white p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]">
            <form className="space-y-6">
                {/* Họ tên */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-800">
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        placeholder="Nguyễn Văn A"
                        className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-800">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="email@domain.com"
                        className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>

                {/* Nội dung */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-800">
                        Nội dung
                    </label>
                    <textarea
                        placeholder="Nhập nội dung bạn muốn trao đổi..."
                        rows={4}
                        className="w-full resize-none rounded-lg border border-neutral-200 px-4 py-3 text-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>

                {/* Nút gửi */}
                <button
                    type="submit"
                    className="w-full rounded-xl bg-neutral-900 py-3 text-sm font-medium text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] transition hover:bg-neutral-800 active:scale-[0.98]"
                >
                    Gửi liên hệ
                </button>

                {/* Chú thích */}
                <p className="text-center text-xs leading-relaxed text-neutral-500">
                    Khi gửi biểu mẫu này, bạn đồng ý nhận phản hồi qua email từ
                    đội ngũ Botforge. Thông tin của bạn luôn được bảo mật —
                    không spam.
                </p>
            </form>
        </div>
    );
}

export default ContactForm;
