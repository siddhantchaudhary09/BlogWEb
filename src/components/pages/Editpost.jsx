import React, { useEffect, useState } from "react";
import Postform from "../postform/Postform";
import service from "../../Appwrite/Config";
import Container from "../container/Container";
import { useNavigate, useParams } from "react-router-dom";

function Editpost() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <Postform post={post} />
      </Container>
    </div>
  ) : null;
}

export default Editpost;
