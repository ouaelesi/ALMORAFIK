import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

const LangSwitcher = () => {
  const { locale, locales, asPath } = useRouter();

  const handleClick = (i) => {};

  useEffect(() => {}, [locale]);
  return (
    <div className="md:px-2 px-1 flex font-bold gap-1 ">
      <div className="flex">
        {locale === "arab" && (
          <Link href={asPath} locale="fr">
            <div
              className={`md:gap-2 gap-1 text-sm  text-center ml-2 hover:text-custom-green `}
              onClick={() => handleClick(1)}
            >
              <FontAwesomeIcon
                icon={faLanguage}
                style={{ marginTop: 2, fontSize: 20 }}
              />
              <p style={{ fontSize: 10, marginTop: -4 }}>English</p>
            </div>
          </Link>
        )}
        {locale === "fr" && (
          <Link href={asPath} locale="arab">
            <div
              className={`md:gap-2 gap-1 md:text:md text-sm  text-center ml-2 hover:text-custom-green`}
              onClick={() => handleClick(0)}
            >
              <FontAwesomeIcon
                icon={faLanguage}
                style={{ marginTop: 2, fontSize: 20 }}
              />{" "}
              <p style={{ fontSize: 10, marginTop: -4 }}>العربية</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LangSwitcher;
