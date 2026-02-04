function MoreButtons() {
    return (
        <div className="mt-10 flex items-center gap-4">
            {/* Get Started */}
            <button className="cursor-pointer rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_-10px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-800 hover:shadow-[0_18px_45px_-12px_rgba(109,40,217,1)] active:translate-y-0">
                Tạo chatbot miễn phí
            </button>

            {/* See Demo */}
            <button className="cursor-pointer rounded-xl border border-black bg-transparent px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-800 hover:bg-purple-800 hover:text-white hover:shadow-[0_14px_35px_-12px_rgba(109,40,217,0.9)] active:translate-y-0">
                Xem hướng dẫn
            </button>
        </div>
    );
}

export default MoreButtons;
