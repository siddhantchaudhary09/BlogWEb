import React, { useEffect, useState } from "react";
import service from "../Appwrite/Config";
import { Link } from "react-router-dom";

const Postcard = ({ $id, title, featuredImage }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = await service.getfilePreview(featuredImage);
        setPreviewUrl(url);
      } catch (error) {
        console.error("Error fetching file preview:", error);
      }
    };

    fetchData();
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {previewUrl && (
            <img
              src={previewUrl}
              alt={title}
              className="rounded-xl items-center justify-center text-center w-[100%] h-[300px] "
            />
          )}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default Postcard;
