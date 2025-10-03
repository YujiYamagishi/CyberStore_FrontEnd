import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { ChevronDown, ChevronUp } from 'lucide-react';

// 1. Definição da URL da API dinâmica
const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:8000';

export default function Reviews({ summary, productId }: { summary: any, productId: any }) {
    const [comments, setComments] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingComments, setLoadingComments] = useState(true);
    const [errorComments, setErrorComments] = useState<string | null>(null);

    // 2. Função de busca inicial com useCallback
    const fetchInitialComments = useCallback(async () => {
        if (!productId) return;
        
        // Reinicia o estado para a primeira página (1)
        setCurrentPage(1); 
        setLoadingComments(true);
        setErrorComments(null);

        try {
            // CORREÇÃO: Usando API_URL
            const response = await axios.get(`${API_URL}/api/reviews/comments/${productId}?page=1`);
            
            setComments(response.data.data);
            setHasMore(response.data.data.length > 0); // Presume que há mais se houver algum dado
            // Se o backend enviar um campo "totalPages" ou "hasNextPage", use-o aqui
            
        } catch (err: any) {
            setErrorComments(err.response?.data?.error || 'Could not load initial comments.');
        } finally {
            setLoadingComments(false);
        }
    }, [productId]); // Recarrega se o productId mudar

    // 3. Efeito para carregar comentários iniciais
    useEffect(() => {
        fetchInitialComments();
    }, [fetchInitialComments]); // Dependência: fetchInitialComments

    // 4. Função para carregar mais comentários
    const handleViewMore = async () => {
        if (!productId) return;
        
        const nextPage = currentPage + 1;
        setLoadingComments(true);

        try {
            // CORREÇÃO: Usando API_URL
            const response = await axios.get(`${API_URL}/api/reviews/comments/${productId}?page=${nextPage}`);
            
            const newComments = response.data.data || [];

            setComments(prevComments => [...prevComments, ...newComments]);
            setCurrentPage(nextPage);
            
            // Lógica para desativar o botão 'View More'
            if (newComments.length === 0) {
                setHasMore(false);
            }
            // Se o backend retornar menos do que o tamanho da página esperado, pode ser o final.
            // Aqui, mantemos a lógica original: se não houver novos dados, não tem mais.

        } catch (err) {
            setErrorComments('Could not load more comments.');
        } finally {
            setLoadingComments(false);
        }
    };

    // Dados para as barras de classificação (mantidos)
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
            
            {/* Seção de Resumo (Mantida) */}
            {summary && (
                <div className="reviews-summary">
                    {/* ... Seu código de resumo de rating bars e estrelas ... */}
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
                                    <div 
                                        className="rating-bar-filled" 
                                        style={{ width: `${(item.count / (summary.reviews || 1)) * 100}%` }}
                                    ></div>
                                </div>
                                <span>{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Seção de Comentários */}
            <div className="review-comments">
                {/* Mostra 'Loading...' apenas se for o carregamento inicial (sem dados anteriores) */}
                {loadingComments && comments.length === 0 && <p>Loading comments...</p>}
                
                {/* Mostra a mensagem de erro */}
                {errorComments && <p className="error-message">Error: {errorComments}</p>}

                {/* Renderiza os comentários (mantido) */}
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

                {/* Mensagem de "No comments" se o carregamento terminar e não houver dados */}
                {!loadingComments && comments.length === 0 && !errorComments && <p>No comments available for this product.</p>}

            </div>
            
            {/* Botão de Ver Mais */}
            {hasMore && !loadingComments && (
                <div className="view-more-container">
                    <button className="view-more-button" onClick={handleViewMore} disabled={loadingComments}>
                        View More
                        <ChevronDown size={22} />
                    </button>
                </div>
            )}
            
            {/* Indicador de carregamento enquanto busca mais */}
            {loadingComments && comments.length > 0 && (
                 <p className="loading-more">Loading more...</p>
            )}
        </section>
    );
}