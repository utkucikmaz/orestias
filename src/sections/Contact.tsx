import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import Container from "../components/Container";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

type Status = "idle" | "sending" | "success" | "error";
type ErrorKey =
    | "generic"
    | "rateLimit"
    | "invalidData"
    | "nameRequired"
    | "emailInvalid"
    | "subjectRequired"
    | "messageRequired"
    | "serviceUnavailable";

const Contact = () => {
    const { t } = useTranslation();
    const formRef = useRef<HTMLFormElement | null>(null);
    const [status, setStatus] = useState<Status>("idle");
    const [errorKey, setErrorKey] = useState<ErrorKey | null>(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as
        | string
        | undefined;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as
        | string
        | undefined;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as
        | string
        | undefined;

    const emailConfigured = Boolean(serviceId && templateId && publicKey);

    const resolveErrorKey = (error: unknown): ErrorKey => {
        if (typeof error === "object" && error) {
            const statusCode = (error as { status?: number }).status;
            if (statusCode === 429) return "rateLimit";
            if (statusCode === 400) return "invalidData";
            if (statusCode && statusCode >= 500)
                return "serviceUnavailable";
        }

        return "generic";
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!formRef.current) return;

        setErrorKey(null);

        if (!emailConfigured) {
            setStatus("error");
            setErrorKey("serviceUnavailable");
            return;
        }

        if (!formRef.current.checkValidity()) {
            const nameInput = formRef.current.elements.namedItem(
                "user_name"
            ) as HTMLInputElement | null;
            const emailInput = formRef.current.elements.namedItem(
                "user_email"
            ) as HTMLInputElement | null;
            const messageInput = formRef.current.elements.namedItem(
                "message"
            ) as HTMLTextAreaElement | null;

            let nextKey: ErrorKey = "invalidData";

            if (nameInput?.validity.valueMissing) {
                nextKey = "nameRequired";
            } else if (
                emailInput?.validity.valueMissing ||
                emailInput?.validity.typeMismatch
            ) {
                nextKey = "emailInvalid";
            } else if (messageInput?.validity.valueMissing) {
                nextKey = "messageRequired";
            }

            setStatus("error");
            setErrorKey(nextKey);
            formRef.current.reportValidity();
            return;
        }

        setStatus("sending");

        try {
            await emailjs.sendForm(serviceId!, templateId!, formRef.current, {
                publicKey: publicKey!,
            });
            setStatus("success");
            setErrorKey(null);
            formRef.current.reset();
        } catch (error) {
            console.error(error);
            setStatus("error");
            setErrorKey(resolveErrorKey(error));
        }
    };

    return (
        <Section id="contact">
            <Container className="space-y-12">
                <Reveal>
                    <SectionHeading
                        eyebrow={t("contact.eyebrow")}
                        title={t("contact.title")}
                        description={t("contact.description")}
                    />
                </Reveal>
                <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
                    <Reveal>
                        <div className="rounded-3xl border border-ink-100 bg-white/90 p-8 shadow-soft dark:border-ink-700 dark:bg-ink-800/70">
                            <div className="space-y-6 text-sm text-ink-700 dark:text-ink-300">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
                                        {t("contact.details.emailLabel")}
                                    </p>
                                    <p className="text-lg font-semibold text-ink-900 dark:text-ink-50">
                                        {t("contact.details.email")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
                                        {t("contact.details.phoneLabel")}
                                    </p>
                                    <p className="text-lg font-semibold text-ink-900 dark:text-ink-50">
                                        {t("contact.details.phone")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
                                        {t("contact.details.addressLabel")}
                                    </p>
                                    <p className="text-sm text-ink-700 dark:text-ink-300">
                                        {t("contact.details.address")}
                                    </p>
                                    <p className="text-xs text-ink-500 dark:text-ink-400">
                                        {t("contact.details.hours")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                    <Reveal>
                        <div className="rounded-3xl border border-ink-100 bg-white/95 p-8 shadow-soft dark:border-ink-700 dark:bg-ink-800/70">
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="grid gap-4"
                            >
                                {status === "success" ? (
                                    <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-left dark:border-green-900 dark:bg-green-950/20">
                                        <div className="flex items-start gap-3">
                                            <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center text-green-600 dark:text-green-400">
                                                <svg
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                    className="h-5 w-5"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-9.707a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 1 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                                                    {t("contact.success")}
                                                </p>
                                                <p className="text-sm text-green-600 dark:text-green-400">
                                                    {t(
                                                        "contact.successMessage"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                                {status === "error" && errorKey ? (
                                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-left dark:border-red-900 dark:bg-red-950/20">
                                        <div className="flex items-start gap-3">
                                            <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center text-red-600 dark:text-red-400">
                                                <svg
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                    className="h-5 w-5"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.516 11.59c.75 1.334-.213 3.011-1.742 3.011H3.483c-1.53 0-2.492-1.677-1.742-3.011l6.516-11.59zM11 13a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm-1-7a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V7a1 1 0 0 0-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                            <p className="text-sm text-red-700 dark:text-red-300">
                                                {t(`contact.error.${errorKey}`)}
                                            </p>
                                        </div>
                                    </div>
                                ) : null}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="text-sm text-ink-700 dark:text-ink-300">
                                        {t("contact.form.name")}
                                        <input
                                            type="text"
                                            name="user_name"
                                            required
                                            className="mt-2 w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-ocean-500 dark:border-ink-700 dark:bg-ink-900/60 dark:text-ink-100 dark:focus:border-ocean-300"
                                        />
                                    </label>
                                    <label className="text-sm text-ink-700 dark:text-ink-300">
                                        {t("contact.form.email")}
                                        <input
                                            type="email"
                                            name="user_email"
                                            required
                                            className="mt-2 w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-ocean-500 dark:border-ink-700 dark:bg-ink-900/60 dark:text-ink-100 dark:focus:border-ocean-300"
                                        />
                                    </label>
                                </div>
                                <label className="text-sm text-ink-700 dark:text-ink-300">
                                    {t("contact.form.company")}
                                    <input
                                        type="text"
                                        name="company"
                                        className="mt-2 w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-ocean-500 dark:border-ink-700 dark:bg-ink-900/60 dark:text-ink-100 dark:focus:border-ocean-300"
                                    />
                                </label>
                                <label className="text-sm text-ink-700 dark:text-ink-300">
                                    {t("contact.form.message")}
                                    <textarea
                                        name="message"
                                        rows={4}
                                        required
                                        className="mt-2 w-full resize-none rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-ocean-500 dark:border-ink-700 dark:bg-ink-900/60 dark:text-ink-100 dark:focus:border-ocean-300"
                                    />
                                </label>
                                <div className="flex flex-wrap gap-4 self-end">
                                    <button
                                        type="submit"
                                        className="rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-ink-50 dark:text-ink-900 dark:hover:bg-ink-100 flex w-full justify-center"
                                        disabled={status === "sending"}
                                    >
                                        {status === "sending"
                                            ? t("contact.form.sending")
                                            : t("contact.form.submit")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </Section>
    );
};

export default Contact;
