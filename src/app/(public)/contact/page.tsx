import Questions from "@/app/(public)/(home)/components/Questions/Questions";
import ContactForm from "@/app/(public)/contact/ContactForm";
import ContactInfoItem from "@/app/(public)/contact/ContactInfoItem";
import CONTACT_ITEMS from "@/app/(public)/contact/data";

function ContactPage() {
    return (
        <div className="bg-muted pb-30">
            <div className="mx-auto w-full max-w-5xl px-4 pt-28 sm:px-6 sm:pt-40">
                <h1 className="text-center text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
                    Liên hệ với chúng tôi
                </h1>
                <p className="text-md mx-auto mt-4 w-full max-w-xl text-center text-muted-foreground">
                    Có câu hỏi về chatbot, cần hỗ trợ kỹ thuật hoặc muốn góp ý
                    cải thiện sản phẩm? Hãy để lại tin nhắn cho chúng tôi.
                </p>
            </div>
            <div className="px-4 sm:px-0">
                <ContactForm />
            </div>
            <div className="mx-auto mt-12 grid w-full max-w-5xl grid-cols-1 gap-6 px-4 sm:mt-16 sm:px-6 md:grid-cols-2">
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
