import React, { useEffect, useState } from "react";
import service from "../../Appwrite/Config";
import Container from "../container/Container";
import { useSelector } from "react-redux";
import Postcard from "../Postcard";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const login = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

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
              <h1 className="text-5xl font-bold">Login to read posts</h1>
              <p className="font-bold text-2xl w-4/5 mx-auto py-5">
                Embark on your blogging journey with ease! Begin crafting your
                first captivating article on this user-friendly platform.
              </p>
              <div className="p-4 ">
                <button
                  onClick={() => navigate("/login")}
                  className="font-semibold bg-white px-6 py-2 rounded-md hover:bg-gray-400 duration-200 "
                >
                  Get Started
                </button>
              </div>
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
