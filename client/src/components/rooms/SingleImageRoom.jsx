import "./Rooms.css";

const SingleImageRoom = ({ src, alt }) => (
  <div className="image-container-room">
    <img src={src} alt={alt} />
  </div>
);

export {SingleImageRoom}