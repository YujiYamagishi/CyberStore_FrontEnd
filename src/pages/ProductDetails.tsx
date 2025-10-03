import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import ProductInfo from '../components/productDetails/ProductInfo';
import Reviews from '../components/productDetails/Reviews';
import RelatedProducts from '../components/productDetails/RelatedProducts';
import Breadcrumb from '../components/Breadcrumb';

import '../styles/product-details.css';

// 1. Definição da URL da API dinâmica
const API_URL = (import.meta.env.REACT_APP_API_URL as string) || 'http://localhost:8000';

export default function ProductDetails() {
    const { productId } = useParams();

    const [product, setProduct] = useState<any>(null);
    const [reviewsSummary, setReviewsSummary] = useState<any>(null);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductData = async () => {
            if (!productId) {
                setError("Product ID is missing.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                // CORREÇÃO 1: Buscar Produto
                const productResponse = await axios.get(`${API_URL}/api/product/${productId}`);
                const productData = productResponse.data.products;
                setProduct(productData);

                // CORREÇÃO 2: Buscar Resumo de Reviews
                const reviewsSummaryResponse = await axios.get(`${API_URL}/api/reviews/summary/${productId}`);
                setReviewsSummary(reviewsSummaryResponse.data.data);

                if (productData.brand) {
                    // CORREÇÃO 3: Buscar Produtos Relacionados
                    const relatedProductsResponse = await axios.get(`${API_URL}/api/products/related/${productData.brand}`);
                    setRelatedProducts(relatedProductsResponse.data.data);
                }
            } catch (err: any) {
                // Adicionado verificação para 404
                if (err.response?.status === 404) {
                    setError('Product not found.');
                } else {
                    setError(err.response?.data?.error || 'An unexpected error occurred while fetching product data.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [productId]);

    if (loading) {
        return <div className="page-content-wrapper"><p>Loading product details...</p></div>;
    }

    if (error) {
        return <div className="page-content-wrapper"><p>Error: {error}</p></div>;
    }

    if (!product) {
        return <div className="page-content-wrapper"><p>Product data could not be loaded.</p></div>;
    }
    
    // Lógica de Breadcrumb mantida
    const breadcrumbCrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Catalog', path: '/products' },
        { label: product.id_category === 3 ? 'Smartphones' : 'Category', path: `/products/smartphones` },
        { label: product.brand, path: `/products/${product.brand}` },
        { label: product.name }
    ];

    return (
        <div className="page-content-wrapper">
            <Breadcrumb crumbs={breadcrumbCrumbs} />
            <ProductInfo product={product} />
            {/* Passando o summary e o ID para os sub-componentes */}
            <Reviews summary={reviewsSummary} productId={productId} />
            <RelatedProducts products={relatedProducts} />
        </div>
    );
}