import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {Card, CardFooter,CardHeader,CardBody} from "@heroui/card";
import {Divider} from "@heroui/divider";
import {Button} from "@heroui/button";
import {Image} from "@heroui/image";
import { Link } from "@heroui/link";

export default function ContactPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 style={{"fontSize": "1.8rem"}}>社交媒体</h1>
          <div className="gap-2 grid grid-cols-2">
            <Card isFooterBlurred className="border-none" radius="lg">
              <Image
                alt="Woman listing to music"
                className="object-cover w-full"
                height={245}
                src="images/wechat.jpeg"
                width={270}
              />
              <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 flex justify-center items-center">
                <Button
                  className="text-tiny text-white bg-black/20"
                  color="primary"
                  radius="lg"
                  size="sm"
                  variant="flat"
                  onClick={async () => {
                    await navigator.clipboard.writeText("YuxiInc");
                  }}
                >
                  点击复制 YuxiInc
                </Button>
              </CardFooter>
            </Card>
            <Card isFooterBlurred className="border-none" radius="lg">
              <Image
                alt="Woman listing to music"
                className="object-cover"
                height={245}
                src="images/qq.jpeg"
                width={270}
              />
              <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 flex justify-center items-center">
                <Button
                  className="text-tiny text-white bg-black/20"
                  color="primary"
                  radius="lg"
                  size="sm"
                  variant="flat"
                  onClick={() => {
                    document.location = "https://qm.qq.com/q/7KjyTLTrYA";
                  }}
                >
                  点击加群 Yuxi IT
                </Button>
              </CardFooter>
            </Card>
          </div>
          <br/>
          <h1 style={{"fontSize": "1.8rem"}}>电子邮箱</h1>
          <div className="gap-2 grid grid-cols-2">
            
            <Card>
              <CardHeader className="flex gap-3">

                <div className="flex flex-col">
                  <p className="text-md">工作邮箱</p>
                  <p className="text-small text-default-500">Sm4Z0n3T@outlook.com</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>可以在法定工作日的时候通过此邮箱联系我</p>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link isExternal showAnchorIcon href="mailto:Sm4Z0n3T@outlook.com">
                  现在就发邮件联系我
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex text-center">
                <div className="flex flex-col">
                  <p className="text-md">业务邮箱</p>
                  <p className="text-small text-default-500">YuxiIT@hotmail.com</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>可以在法定工作日时候通过此邮箱咨询业务或其他信息</p>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link isExternal showAnchorIcon href="mailto:YuxiIT@hotmail.com">
                现在就发邮件进行咨询
                </Link>
              </CardFooter>
            </Card>
          </div>
          
        </div>
      </section>
    </DefaultLayout>
  );
}
