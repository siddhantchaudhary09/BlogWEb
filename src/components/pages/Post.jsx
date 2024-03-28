import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../Appwrite/Config";
import Button from "../Button";
import Container from "../container/Container";
import parse from "html-react-parser";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={
              post.featuredImage
                ? service.getfilePreview(post.featuredImage)
                : "data:image/jpeg;base64,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"
            }
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
