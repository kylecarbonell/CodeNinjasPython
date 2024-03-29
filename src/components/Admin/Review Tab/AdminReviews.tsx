// import { useLocation } from "react-router-dom";


function AdminReviews() {
  const queryParameters = new URLSearchParams(window.location.search)
  const activity = queryParameters.get("activity")
  const author = queryParameters.get("author")



  return (
    <>
      <h1 style={{ color: "black" }}>{activity}</h1>
      <h1 style={{ color: "black" }}>{author}</h1>
    </>
  );
}

export default AdminReviews;
