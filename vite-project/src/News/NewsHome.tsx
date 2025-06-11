import Parser from "rss-parser/dist/rss-parser.min.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const parser = new Parser();
const CORS_PROXY = 'https://api.allorigins.win/get?url=';
const RSS_URL = 'https://vnexpress.net/rss/the-thao.rss';

const NewsHome = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 15;

    useEffect(() => {
        const fetchRSSFeed = async () => {
            try {
                const response = await fetch(CORS_PROXY + encodeURIComponent(RSS_URL));
                const data = await response.json();
                const feed = await parser.parseString(data.contents);

                const updatedItems = feed.items.map((item: any) => {
                    const imageUrl = item.enclosure?.url || item['media:content']?.url || "https://via.placeholder.com/300x200?text=No+Image";
                    return { ...item, imageUrl };
                });

                setArticles(updatedItems);
            } catch (error) {
                console.error('Failed to fetch RSS feed:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRSSFeed();
    }, []);

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const totalPages = Math.ceil(articles.length / articlesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="container" style={{marginTop:"85px"}}>
            <h1 className="text-center mb-5 text-danger">📰 Tin Thể Thao - VnExpress</h1>
            {loading ? (
                <div className="text-center">
                    <p>Đang tải tin tức...</p>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="row">
                        {currentArticles.map((article, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <Link to={`/News/${encodeURIComponent(JSON.stringify(article))}`} className="text-decoration-none">
                                    <div className="card h-100">
                                        <img
                                            src={article.imageUrl}
                                            className="card-img-top"
                                            alt={article.title}
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title text-primary">{article.title}</h5>
                                            <p className="card-text text-muted">
                                                {new Date(article.pubDate).toLocaleString()}
                                            </p>
                                            <p className="card-text">{article.contentSnippet}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <button
                            className="btn btn-primary me-2"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Trang trước
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Trang sau
                        </button>
                    </div>
                    <p className="text-center mt-3">Trang {currentPage} / {totalPages}</p>
                </>
            )}
        </div>
    )
};

export default NewsHome;
