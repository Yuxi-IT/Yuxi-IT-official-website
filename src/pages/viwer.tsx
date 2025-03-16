import { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { useNavigate } from 'react-router-dom';

function getQueryParam(param: string) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
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
      if(data.search('class="header"') !== -1){
        hbody.innerHTML = data;
      }
    }
  })
  .catch(error => {
    console.error('Error fetching product data:', error);
  });
}


export default function BlogViwer() {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const blogId = getQueryParam("id");
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
          onClick={() => navigate('/blog')}
        >
          回到主页
        </Button>
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 style={{ fontSize: "2.2rem","display":"none" }}>
            {id ? `Blog ID: ${id}` : "No ID provided"}
          </h1>
        </div>
        <div id="hBody"  style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <h1 style={{fontSize:"7.7rem",marginTop:"100px"}}>😰</h1>
          <h2 style={{fontSize:"1.7rem"}}>文章好像丢失了</h2>
          <br/>
          <Button onClick={() => navigate('/blog')}>
            看看别的
          </Button>
        </div>
      </section>
    </DefaultLayout>
  );
}