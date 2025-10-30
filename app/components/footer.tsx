const Footer = () => {
  return (
    <footer className="bg-footer flex h-[176px] w-full flex-col justify-center gap-3 p-10 md:mx-auto md:h-32 md:gap-4">
      {/* Attribution Text */}
      <p className="text-center text-xs text-neutral-200 md:text-sm">
        此計畫由
        <a
          href="https://www.freiheit.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          弗里德里希諾曼自由基金會（FNF）
        </a>
        及
        <a
          href="https://ccw.org.tw/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          公民監督國會聯盟
        </a>
        支持。立法院資料串接由
        <a
          href="https://openfun.tw"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          歐噴有限公司（OpenFun）
        </a>
        協力。
      </p>

      {/* Links */}
      <div className="text-info-accent flex items-center justify-center gap-2 text-xs md:text-sm">
        <a
          href="https://data.gov.tw"
          target="_blank"
          rel="noopener noreferrer"
          className="text-info-accenthover:underline"
        >
          開放資料
        </a>
        <span className="text-neutral-200">|</span>
        <a
          href="https://github.com/readr-media/congress-budget"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          開放原始碼
        </a>
      </div>
    </footer>
  );
};

export default Footer;
