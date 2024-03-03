interface props {
    reviews: any,
    setReviews: (e: any) => void
}

function AdminReviews(props: props) {
    return <>
        <h1>hi</h1>
        {props.reviews.map((review: any) => {
            return <h1>{review.code}</h1>
        })}
    </>
}

export default AdminReviews;