interface props {
  reviews: any;
  setReviews: (e: any) => void;
}

function AdminReviews(props: props) {
  return (
    <>
      <div>{props.reviews}</div>
    </>
  );
}

export default AdminReviews;
