import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_KEY } from "./App";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  justify-content: center;
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color:transparent;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  margin: auto;
`;

const Header = styled.h1`
font-size: 40px;
font-weight: bold;
color: #333;
text-align: center;
margin-bottom: 20px;
cursor: pointer;
transition: color 0.3s ease, transform 0.3s ease;

&:hover {
  color:rgb(124, 37, 0); /* Change color on hover */
  transform: scale(1.05); /* Slightly enlarge the header */
}

&:active {
  transform: scale(1); /* Reset scaling when clicked */
  color:rgb(217, 149, 137); /* Slightly darker color on active click */
}

&:focus {
  outline: none; /* Remove focus outline */
  box-shadow: 2px 2px 5px rgba(210, 184, 183, 0.8); /* Highlight with shadow */
}
`;


const MovieDetailsContainer = styled.div` 
   display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;

  background: linear-gradient(135deg,rgb(29, 29, 45), #ffffff); /* Gradient from dark blue to white */
  padding: 20px;
  border-radius: 10px; /* Optional: for rounded corners */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Optional: subtle shadow */
  
  transition: background 0.5s ease-in-out; /* Smooth transition on background color change */
  
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 500px;
  border-radius: 10px;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  width:400px;
  margin-left: 20px;
 
`;

const MovieName = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  text-transform: capitalize;
`;

const MovieInfo = styled.p`
  font-size: 16px;
  color: #444;
  margin: 5px 0;

  & span {
    font-weight: bold;
    color: #333;
  }
`;

const Button = styled.button`
  background-color: #ff6f61;
  color: white;
  font-size: 14px;
  padding: 10px 15px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #ff3d3d;
  }
`;

const ReviewSection = styled.div`
  margin-top: 20px;
`;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid lightgray;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid lightgray;
  border-radius: 5px;
`;

const ReviewList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ReviewItem = styled.li`
  background-color: #fff;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const [reviews, setReviews] = useState([]);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [newReview, setNewReview] = useState({ rating: "", comment: "" });

  const { selectedMovie } = props;

  useEffect(() => {
    Axios.get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
      .then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);

  const handleCredentialChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const addReview = (e) => {
    e.preventDefault();
    setReviews([...reviews, { ...newReview, id: Date.now() }]);
    setNewReview({ rating: "", comment: "" });
  };

  const editReview = (id) => {
    const reviewToEdit = reviews.find((review) => review.id === id);
    setNewReview({ rating: reviewToEdit.rating, comment: reviewToEdit.comment });
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  return (
    <Container>
      {movieInfo ? (
        <>
          <Header>Movie Review System</Header>
          <MovieDetailsContainer>
            <CoverImage src={movieInfo?.Poster} alt={movieInfo?.Title} />
            <InfoColumn>
              <MovieName>{movieInfo?.Title}</MovieName>
              <MovieInfo>
                <span>IMDB Rating:</span> {movieInfo?.imdbRating}
              </MovieInfo>
              <MovieInfo>
                <span>Year:</span> {movieInfo?.Year}
              </MovieInfo>
              <MovieInfo>
                <span>Language:</span> {movieInfo?.Language}
              </MovieInfo>
              <MovieInfo>
                <span>Rated:</span> {movieInfo?.Rated}
              </MovieInfo>
              <MovieInfo>
                <span>Released:</span> {movieInfo?.Released}
              </MovieInfo>
              <MovieInfo>
                <span>Runtime:</span> {movieInfo?.Runtime}
              </MovieInfo>
              <MovieInfo>
                <span>Genre:</span> {movieInfo?.Genre}
              </MovieInfo>
              <MovieInfo>
                <span>Director:</span> {movieInfo?.Director}
              </MovieInfo>
              <MovieInfo>
                <span>Actors:</span> {movieInfo?.Actors}
              </MovieInfo>
              <MovieInfo>
                <span>Plot:</span> {movieInfo?.Plot}
              </MovieInfo>
            </InfoColumn>
          </MovieDetailsContainer>
          <ReviewSection>
            <h2>Provide Your Review</h2>
            <ReviewForm onSubmit={addReview}>
              <Input
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleCredentialChange}
                required
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleCredentialChange}
                required
              />
              <Input
                name="rating"
                type="number"
                placeholder="Rating (1-5)"
                value={newReview.rating}
                onChange={handleReviewChange}
                required
              />
              <TextArea
                name="comment"
                placeholder="Write your comment here"
                value={newReview.comment}
                onChange={handleReviewChange}
                required
              />
              <Button type="submit">Submit Review</Button>
            </ReviewForm>
            <h3>Reviews</h3>
            <ReviewList>
              {reviews.map((review) => (
                <ReviewItem key={review.id}>
                  <p>
                    <strong>Rating:</strong> {review.rating}/5
                  </p>
                  <p>
                    <strong>Comment:</strong> {review.comment}
                  </p>
                  <Button onClick={() => editReview(review.id)}>Edit</Button>
                  <Button onClick={() => deleteReview(review.id)}>Delete</Button>
                </ReviewItem>
              ))}
            </ReviewList>
          </ReviewSection>
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};

export default MovieInfoComponent;
