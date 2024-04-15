import "./Rooms.css";

export const SingleImageRoom = ({ src, alt }) => (
  <div className="image-container-room">
    <img src={src} alt={alt} />
  </div>
);