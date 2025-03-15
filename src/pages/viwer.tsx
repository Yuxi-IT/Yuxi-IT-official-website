import { useEffect, useState } from "react";
import { title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";

// 解析查询字符串参数的函数
function getQueryParam(param: string) {
  const queryString = window.location.search; // 获取查询字符串（如 "?id=123"）
  const urlParams = new URLSearchParams(queryString); // 解析查询字符串
  var result = urlParams.get(param);
  if(result){
    return result;
  }
  return "";
}
function getBody(id: string){
  fetch(`/blogs/${id}.html`)
  .then(response => response.text())
  .then(data => {
    var hbody = document.getElementById("hBody");
    if(hbody){
      hbody.innerHTML = data;
    }
  })
  .catch(error => {
    console.error('Error fetching product data:', error);
  });
}

export default function BlogViwer() {
  const [id, setId] = useState("");

  useEffect(() => {
    const blogId = getQueryParam("id"); // 获取 id 参数
    setId(blogId);
    getBody(blogId);
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center">
      <Button
          style={{
            position: "absolute",
            left: "25px",
            top: "80px",
          }}
          onClick={() => {
            window.location.href = "blog";
          }
          }
        >
          回到主页
        </Button>
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 style={{ fontSize: "2.2rem","display":"none" }}>
            {id ? `Blog ID: ${id}` : "No ID provided"}
          </h1>
        </div>
        <div id="hBody"></div>
      </section>
    </DefaultLayout>
  );
}