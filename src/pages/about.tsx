import { siteConfig } from "@/config/site";
import DefaultLayout from "@/layouts/default";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";


export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col items-center justify-center text-center">
        <Image
            alt="yuxilogo"
            className="object-cover items-center h-[200px] w-[200px] rounded-[90px] my-4"
            src="logo.jpg"
          />
         <h1 style={{ fontSize: "2.2rem", fontWeight: "bold"  }}>
         {siteConfig.name}
          </h1>
        <p className="max-w-lg mt-4 text-lg">
        {siteConfig.name}，成立于2025年3月。
          <p>
          是一家致力于软件外包、软件开发、网站开发等业务，并进行其他开源项目开发的互联网公司。
          成立时拥有开源项目共6个，开源社区请访问：
            <Link href="https://github.com/Yuxi-IT" target="_blank">
              GitHub主页
            </Link>
            <br/>
            代表作品：
            <Link href="https://github.com/SmaZone2020/HotRAT-Nextgen" target="_blank">
              HotRAT-Nextgen
            </Link>、
            <Link href="https://github.com/Yuxi-IT/HotRAT4.0" target="_blank">
              HotRAT4.0
            </Link>、
            <Link href="https://github.com/Yuxi-IT/NovaMAUI" target="_blank">
              NovaMAUI
            </Link>、
          </p>

          
        </p>
      </div>
      </section>
    </DefaultLayout>
  );
}
