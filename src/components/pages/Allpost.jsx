import React, { useEffect, useState } from "react";
import service from "../../Appwrite/Config";
import Container from "../container/Container";
import Postcard from "../Postcard";
import { useSelector } from "react-redux";

const Allpost = () => {
  const [posts, setPosts] = useState([]);
  const [Filtered, setFiltered] = useState([]);
  const user = useSelector((state) => state.auth.userData);
  console.log(user);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    service
      .getAllPosts([])
      .then((posts) => {
        setLoading(false);
        if (posts) {
          const filteredPosts = posts.documents.filter(
            (post) => post.userId === user.$id
          );
          setPosts(filteredPosts);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("An error occurred while fetching posts.");
        console.error(error);
      });
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <Postcard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Allpost;
