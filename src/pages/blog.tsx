import { useState, useEffect } from "react";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";

// 定义 BlogCard 类
class BlogCard {
  public id: string = "";
  public title: string = "";
  public content: string = "";
  public author: string = "";
  public tags: string[] = [];
  public date: string = "";
}

// 计算发布时间距离现在的时间差
function getTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}秒前`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}分钟`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}小时`;
  } else if (diffInSeconds < 2592000) {
    return `${Math.floor(diffInSeconds / 86400)}天`;
  } else if (diffInSeconds < 31536000) {
    return `${Math.floor(diffInSeconds / 2592000)}个月`;
  } else {
    return `${Math.floor(diffInSeconds / 31536000)}年`;
  }
}

export default function DocsPage() {
  // 使用 BlogCard 类作为状态的初始值
  const [blogList, setBlogList] = useState<BlogCard[]>([]);

  // 获取 /blog.json 数据
  useEffect(() => {
    fetch("/blog.json")
      .then((response) => response.json())
      .then((data) => {
        setBlogList(data);
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
      });
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          {blogList.map((blog, index) => (
            <Card key={index} style={{transform: "scale(1)"}} 
              className="w-[300px] md:w-[120vh] h-[225px] md:h-[250px] w-full w-auto max-w-full mb-4">
              <CardHeader className="justify-between">
                <div className="flex gap-5">
                  <Avatar isBordered radius="full" size="md" src="logo.jpg" />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h3 className="font-semibold leading-none text-default-600">
                      {blog.title}
                    </h3>
                    <h4 className="tracking-tight text-default-400">
                      @{blog.author}
                    </h4>
                  </div>
                </div>
                <Button
                  style={{fontSize:15}}
                  color="primary"
                  radius="full"
                  size="sm"
                  onClick={()=>{
                    document.location = ("/view?id=" + blog.id)
                  }}
                >
                  查看
                </Button>
              </CardHeader>
              <CardBody className="px-3 py-0 text-default-400">
                <p>{blog.content}</p>
                <span className="pt-2">
                  {blog.tags.map((tag, i) => (
                    <span key={i}>
                      #{tag}
                      {i < blog.tags.length - 1 && " "}
                    </span>
                  ))}
                  <span aria-label="computer" className="py-2" role="img">
                    💻
                  </span>
                </span>
              </CardBody>
              <CardFooter className="gap-3">
                <div className="flex gap-1">
                  <p className="text-default-400 text-small">发布于</p>
                  <p className="font-semibold text-default-400 text-small">
                    {blog.date}
                  </p>
                </div>
                <div className="flex gap-1">
                  <p className="font-semibold text-default-400 text-small">
                    {getTimeAgo(blog.date)}
                  </p>
                  <p className="text-default-400 font-semibold text-small">前</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}