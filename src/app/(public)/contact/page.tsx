import Questions from "@/app/(public)/(home)/components/Questions/Questions";
import ContactForm from "@/app/(public)/contact/ContactForm";
import ContactInfoItem from "@/app/(public)/contact/ContactInfoItem";
import CONTACT_ITEMS from "@/app/(public)/contact/data";

function ContactPage() {
    return (
        <div className="bg-[#f6f6f6] pb-30">
            <div className="mx-auto w-5xl pt-40">
                <h1 className="text-center text-6xl font-bold">
                    Liên hệ với chúng tôi
                </h1>
                <p className="text-md mx-auto mt-4 w-xl text-center">
                    Có câu hỏi về chatbot, cần hỗ trợ kỹ thuật hoặc muốn góp ý
                    cải thiện sản phẩm? Hãy để lại tin nhắn cho chúng tôi.
                </p>
            </div>
            <ContactForm />
            <div className="mx-auto mt-16 grid w-5xl grid-cols-2 gap-6">
                {CONTACT_ITEMS.map((item) => (
                    <ContactInfoItem
                        key={item.title}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                        linkText={item.linkText}
                    />
                ))}
            </div>

            <Questions />
        </div>
    );
}

export default ContactPage;
