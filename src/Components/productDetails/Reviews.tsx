import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Reviews({ summary, productId }: { summary: any, productId: any }) {
  const [comments, setComments] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [errorComments, setErrorComments] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialComments = async () => {
      if (!productId) return;
      setLoadingComments(true);
      setErrorComments(null);
      try {
        const response = await axios.get(`http://localhost:8000/api/reviews/comments/${productId}?page=1`);
        setComments(response.data.data);
        if (response.data.data.length < 3) {
          setHasMore(false);
        }
      } catch (err: any) {
        setErrorComments(err.response?.data?.error || 'Could not load comments.');
      } finally {
        setLoadingComments(false);
      }
    };

    fetchInitialComments();
  }, [productId]);

  const handleViewMore = async () => {
    const nextPage = currentPage + 1;
    try {
      const response = await axios.get(`http://localhost:8000/api/reviews/comments/${productId}?page=${nextPage}`);
      setComments(prevComments => [...prevComments, ...response.data.data]);
      setCurrentPage(nextPage);
      if (response.data.data.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      setErrorComments('Could not load more comments.');
    }
  };

  const ratingBarsData = summary ? [
    { label: 'Excellent', count: summary.excellent },
    { label: 'Good', count: summary.good },
    { label: 'Average', count: summary.average },
    { label: 'Below Average', count: summary.below_average },
    { label: 'Poor', count: summary.poor },
  ] : [];

  return (
    <section className="reviews-section">
      <h2 className="section-title">Reviews</h2>
      
      {summary && (
        <div className="reviews-summary">
          <div className="summary-score">
            <div className="summary-rating-and-text">
              <p className="average-rating">{summary.media}</p>
              <p className="total-reviews">of {summary.reviews} reviews</p>
            </div>
            <div className="summary-stars">
              {[1, 2, 3, 4, 5].map((starValue) => {
                if (summary.media >= starValue) return <FaStar key={starValue} />;
                if (summary.media >= starValue - 0.5) return <FaStarHalfAlt key={starValue} />;
                return <FaRegStar key={starValue} />;
              })}
            </div>
          </div>
          <div className="summary-bars">
            {ratingBarsData.map(item => (
              <div key={item.label} className="rating-bar-container">
                <span>{item.label}</span>
                <div className="rating-bar">
                  <div className="rating-bar-filled" style={{ width: `${(item.count / summary.reviews) * 100}%` }}></div>
                </div>
                <span>{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="review-comments">
        {loadingComments && comments.length === 0 && <p>Loading comments...</p>}
        {errorComments && <p>Error: {errorComments}</p>}
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <img src={comment.url_image_user} alt={comment.name_user} className="comment-avatar" />
            <div className="comment-content">
              <div className="comment-header">
                <p className="comment-author">{comment.name_user}</p>
                <p className="comment-date">{new Date(comment.created_at).toLocaleDateString()}</p>
              </div>
              <div className="comment-stars">
                {[1, 2, 3, 4, 5].map((starValue) => {
                  if (comment.rating >= starValue) return <FaStar key={starValue} />;
                  if (comment.rating >= starValue - 0.5) return <FaStarHalfAlt key={starValue} />;
                  return <FaRegStar key={starValue} />;
                })}
              </div>
              <p className="comment-text">{comment.message}</p>
            </div>
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div className="view-more-container">
          <button className="view-more-button" onClick={handleViewMore}>
            View More
            <ChevronDown size={22} />
          </button>
        </div>
      )}
    </section>
  );
}