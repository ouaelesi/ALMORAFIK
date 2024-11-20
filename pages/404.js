import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NotFoundPage = () => {
  const { locale } = useRouter();

  return (
    <div className="h-screen w-full text-center">
      <Image
        width={400}
        height={400}
        className="block mx-auto md:mt-28 md:w-1/4 w-4/4 mt-10"
        alt="in progress almorafik "
        src="/assets/imgs/404.png"
      />
      <h1 style={{ fontSize: "4em", margin: "10px" }}>Oops!</h1>
      <p style={{ fontSize: "1.5em", margin: "10px" }}>
        {locale === "arab"
          ? "يبدو أنك أخطأت الطريق!"
          : "Looks like you took a wrong turn!"}
      </p>
      <p style={{ fontSize: "1em", margin: "10px" }}>
        {locale === "arab"
          ? "هذه الصفحة غير موجودة على موقعنا"
          : "This page doesn't exist on our website"}
      </p>

      <div className="px-4 mt-4 md:w-1/4 mx-auto">
        <button className="btn btn_answer w-100  mx-auto mt-2 block">
          <Link href="/">   {locale === "arab"
          ? "الصفحة الرئيسية"
          : "HOME PAGE"}</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
