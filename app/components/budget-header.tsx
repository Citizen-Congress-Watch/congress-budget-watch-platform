import { ShareButton } from "@readr-media/share-button";
import { NavLink } from "react-router";
import Image from "./image";

const BudgetHeader = () => {
  return (
    <div className="sticky flex items-center justify-between border-t-12 border-t-brand-primary px-3 pt-2">
      <NavLink to="/">
        <Image
          src="/image/readr-header.svg"
          alt="Readr logo"
          className="h-[28px] w-[92px]"
        />
      </NavLink>
      <ShareButton
        className="share-button-header"
        direction="horizon"
        pathColor="#1C1C1C"
      />
    </div>
  );
};

export default BudgetHeader;
