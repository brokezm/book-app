import { useParams } from "react-router-dom";

function BookDetailsPage() {
  const { idd, superId } = useParams();

  return (
    <h1>
      This is Book Details Page. With id of {idd} and super id of {superId}
    </h1>
  );
}

export default BookDetailsPage;
