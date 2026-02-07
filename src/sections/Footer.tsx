import { useTranslation } from "react-i18next";
import Container from "../components/Container";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-ink-100 bg-white/80 dark:border-ink-800 dark:bg-ink-900/80">
      <Container className="flex flex-col gap-4 py-10 text-sm text-ink-600 dark:text-ink-300 sm:flex-row sm:items-center sm:justify-between">
        <p>{t("footer.tagline")}</p>
        <p className="text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
          {t("footer.legal")}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
