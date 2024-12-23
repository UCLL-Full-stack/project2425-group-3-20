import { useRouter } from "next/router";

const Language: React.FC = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const handleLanguageChange = (event: { target: { value: string } }) => {
    const newLocale = event.target.value;
    console.log("switching language")
    const {  pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div>
      <label htmlFor="language" className="text-white">
        Language
      </label>
      <select
        id="language"
        value={locale}
        onChange={handleLanguageChange}
      >
        <option value="en">English</option>
        <option value="jp">日本語</option>
      </select>
    </div>
  );
};

export default Language;