import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {Card, CardBody, CardFooter} from "@heroui/card";

var list: any[] = [
  {
    title: "易供需",
    img: "/images/suppylink.jpeg",
    url: "",
    deprecate: "连接供需双方，高效匹配资源与需求的交易保障平台",
    process: 0,
  },{
    title: "NovaPanel",
    img: "/images/novapanel.jpeg",
    url: "https://github.com/Yuxi-IT/NovaPanel",
    deprecate: "专为 Windows Server 设计的 Web 运维面板",
    process: 1,
  },{
    title: "NovaMAUI",
    img: "/images/novamaui.jpeg",
    url: "https://github.com/Yuxi-IT/NovaMAUI",
    deprecate: "MAUI+Blazor+ShadcnUI构建的跨平台应用程序框架",
    process: 1,
  },{
    title: "NovaRAT 4.0",
    img: "/images/hotrat.jpeg",
    url: "https://github.com/Yuxi-IT/HotRAT4.0",
    deprecate: "一款功能强大的远程控制服务端软件，安全、高效地管理远程设备",
    process: 1,
  },{
    title: "HotRAT-Nextgen",
    img: "/images/hotrat2.jpeg",
    url: "https://github.com/SmaZone2020/HotRAT-Nextgen",
    deprecate: "基于 HotRAT 进行二次开发的一个免费开源的远程控制项目",
    process: 2,
  }
];


/*
fetch('/product.json')
  .then(response => response.json())
  .then(data => {
    const lA = data.map((product: { name: any; img: any; url: any; description: any; process: any; }) => ({
      title: product.name,
      img: product.img,
      url: product.url,
      deprecate: product.description,
      process: product.process,
    }));
    list = lA;
  })
  .catch(error => {
    console.error('Error fetching product data:', error);
  });
*/


export default function ProductPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <img
                    alt="yuxilogo"
                    className="object-cover h-[200px] w-[200px] rounded-full"
                    src="logo.png"
                  />
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {list.map((item, index) => (
              /* eslint-disable no-console */
              <Card key={index} isPressable shadow="sm" onPress={() => console.log("item pressed")}>
                <a href={item.url}>
                  <CardBody className="overflow-visible p-0">
                  <img
                    alt={item.title}
                    className="w-full object-cover h-[140px] object-contain"
                    src={item.img}
                    style={{objectFit: "contain","backgroundColor":"#fff" }}
                  />
                  </CardBody>
                  <CardBody>

                  <h2 className="text-xl font-bold">{item.title}</h2>
                    <p>{item.deprecate}</p>
                  </CardBody>
                </a>

                <CardFooter className="text-small justify-end">
                  <div className="flex items-center">
                    {item.process === 0 && (
                      <div className="flex items-center">
                        <span className="bg-red-500 rounded-full w-2 h-2 mr-1"></span>
                        <span>开发</span>
                      </div>
                    )}
                    {item.process === 1 && (
                      <div className="flex items-center">
                        <span className="bg-yellow-500 rounded-full w-2 h-2 mr-1"></span>
                        <span>开源</span>
                      </div>
                    )}
                    {item.process === 2 && (
                      <div className="flex items-center">
                        <span className="bg-green-500 rounded-full w-2 h-2 mr-1"></span>
                        <span>完成</span>
                      </div>
                    )}                    
                    {item.process === 3 && (
                      <div className="flex items-center">
                        <span className="bg-blue-500 rounded-full w-2 h-2 mr-1"></span>
                        <span>维护</span>
                      </div>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
      </section>
    </DefaultLayout>
  );
}
