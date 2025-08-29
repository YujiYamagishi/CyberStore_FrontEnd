import grace from '../../assets/grace.png';
import ronald from '../../assets/ronald.png';
import darcy from '../../assets/darcy.png';
import john from '../../assets/john.png';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const reviewsData = {
  averageRating: 4.8,
  totalReviews: 123,
  ratings: [
    { label: 'Excellent', count: 100 },
    { label: 'Good', count: 11 },
    { label: 'Average', count: 3 },
    { label: 'Below Average', count: 8 },
    { label: 'Poor', count: 1 },
  ],
  comments: [
    {
      author: 'Grace Carey',
      date: '24 January, 2023',
      rating: 5,
      image: grace,
      text: "I was a bit nervous to be buying a secondhand phone from Amazon, but I couldn't be happier with my purchase!! It was super easy to set up and the phone works and looks great. Highly recommend!!!"
    },
    {
      author: 'Ronald Richards',
      date: '24 January, 2023',
      rating: 5,
      image: ronald,
      text: "This phone has 1T storage and is durable. Plus all the new iPhones have a C port! Apple is phasing out the current ones! So if you want a phone that's going to last grab an iPhone 14 pro max and get several cords and plugs."
    },
    {
      author: 'Darcy King',
      date: '24 January, 2023',
      rating: 4,
      image: darcy,
      text: "I might be the only one to say this but the camera is a little funky. Hoping it will change with a software update: otherwise, love this phone! Came in great condition"
    },
    {
      author: 'John Malcolm',
      date: '24 January, 2023',
      rating: 4,
      image: john,
      text: "In Washington, it is already difficult to surprise with the opening of a new institution, but it is still possible. Especially if it is a True Cost project."
    },
    {
      author: 'Ronald Richards',
      date: '23 January, 2023',
      rating: 5,
      image: ronald,
      text: "Excellent battery life and the screen is phenomenal. A worthy upgrade from my previous phone."
    },
    {
      author: 'Grace Carey',
      date: '22 January, 2023',
      rating: 4,
      image: grace,
      text: "The camera system is top-notch, although it takes some time to get used to all the features. Performance is snappy."
    }
  ]
};

export default function Reviews() {
  const [areAllReviewsVisible, setAreAllReviewsVisible] = useState(false);

  const toggleReviews = () => {
    setAreAllReviewsVisible(!areAllReviewsVisible);
  };

const visibleReviews = areAllReviewsVisible ? reviewsData.comments.length : 3;

  return (
    <section className="reviews-section">
      <h2 className="section-title">Reviews</h2>
      <div className="reviews-summary">
        <div className="summary-score">
          <p className="average-rating">{reviewsData.averageRating}</p>
          <div className="summary-stars">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
          <p className="total-reviews">of {reviewsData.totalReviews} reviews</p>
        </div>
        <div className="summary-bars">
          {reviewsData.ratings.map(item => (
            <div key={item.label} className="rating-bar-container">
              <span>{item.label}</span>
              <div className="rating-bar">
                <div className="rating-bar-filled" style={{ width: `${(item.count / reviewsData.totalReviews) * 100}%` }}></div>
              </div>
              <span>{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="review-comments">
        {reviewsData.comments.slice(0, visibleReviews).map((comment, index) => (
          <div key={index} className="comment-card">
            <img src={comment.image} alt={comment.author} className="comment-avatar" />
            <div className="comment-content">
              <div className="comment-header">
                <p className="comment-author">{comment.author}</p>
                <p className="comment-date">{comment.date}</p>
              </div>
              <div className="comment-stars">
                {'★'.repeat(comment.rating)}{'☆'.repeat(5 - comment.rating)}
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      {reviewsData.comments.length > 3 && (
        <div className="view-more-container">
          <button className="view-more-button" onClick={toggleReviews}>
            {areAllReviewsVisible ? 'View Less' : 'View More'}
          </button>
        </div>
      )}
    </section>
  );
}