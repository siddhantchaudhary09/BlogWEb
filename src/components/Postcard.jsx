import React from "react";
import service from "../Appwrite/Config";
import { Link } from "react-router-dom";

const Postcard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={
              featuredImage
                ? service.getfilePreview(featuredImage)
                : "data:image/jpeg;base64,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"
            }
            alt={title}
            className="rounded-xl items-center justify-center"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default Postcard;
