import React, { useEffect, useState } from "react";
import service from "../../Appwrite/Config";
import Container from "../container/Container";
import { useSelector } from "react-redux";
import Postcard from "../Postcard";

function Home() {
  const [posts, setPosts] = useState([]);
  const login = useSelector((state) => state.auth.status);

  useEffect(() => {
    service.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (login === false) {
    return (
      <div className="w-full py-8 mt-4 text-center h-screen">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold">Login to read posts</h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <Container>
        <div className="md:flex md:flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-6 md:p-2 md:w-1/4">
              <Postcard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
