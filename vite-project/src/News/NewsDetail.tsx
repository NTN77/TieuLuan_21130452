import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdArrowBack } from "react-icons/io";

const NewsDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigator = useNavigate();

    useEffect(() => {
        const parsedArticle = JSON.parse(decodeURIComponent(id as string));
        if (parsedArticle) {
            setArticle(parsedArticle);
            setLoading(false);
        } else {
            console.error('Bài viết không tồn tại.');
            setLoading(false);
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!article) return <p>Bài viết không tồn tại hoặc đã bị xóa.</p>;

    return (
        <div className="container " style={{ marginTop: "85px" }}>
            <IoMdArrowBack className={"cursor-pointer "} style={{ fontSize: "30px" }} onClick={() => navigator(-1)} />
            <h1 className="mb-3 text-primary">{article.title}</h1>
            <p className="text-muted">{new Date(article.pubDate).toLocaleString()}</p>
            <div className="border p-3 mb-3">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                🔗 Đọc bài viết đầy đủ tại VnExpress
            </a>
        </div>
    );
};

export default NewsDetail;
