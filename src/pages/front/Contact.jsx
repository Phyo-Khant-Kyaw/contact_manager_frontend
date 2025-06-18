import { useState } from "react";
import { ContactForm } from "../../components/contact-form";
import { contactRepository } from "../../repositories/contactRepository";

export default function ContactPage() {
    const [alert, setAlert] = useState(false);
    const [text, setText] = useState("");
    const [isError, setIsError] = useState(false);
    const handleContactSubmit = async (data) => {
        const response = await contactRepository.createContact(data);
        setAlert(true);
        if (response?.message) {
            setText(response?.message);
            setIsError(false);
        } else {
            setText(
                response?.error ||
                    "An error occurred while submitting your message."
            );
            setIsError(true);
        }
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                {alert && (
                    <div
                        className={`mb-4 p-3 rounded-md text-sm ${
                            isError
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                        }`}
                    >
                        {text}
                    </div>
                )}
                <ContactForm onSubmit={handleContactSubmit} />
            </div>
        </div>
    );
}
