import React from 'react';
import ButtonSaveArt from '../post/post-format/elements/ButtonSaveArt';
import Link from 'next/link';
import Image from 'next/image';

const ArticleFollowed = ({ articleId, title, imageUrl, category, date, categoryId }) => {
    console.log("articleId", articleId);
    return (
        <article className="T4C8M7gx47SgNVdeaEo5">
            <div className="cejlglTblCkKqUv8Qao3">
                <Link href={`/${articleId}`}>
                    <a>
                        <Image 
                            src={imageUrl} 
                            alt={title} 
                            width={500} 
                            height={300} 
                            layout="responsive" 
                            objectFit="cover" 
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = "/path/to/default-image.jpg"; // Đường dẫn đến ảnh mặc định
                            }} 
                        />
                    </a>
                </Link>
            </div>
            <div>
                <h3 className="cenTMdraIxX2mUpD2iEA">
                    <div className="col-1-title"><a href={`/${articleId}`}>{title}</a></div>
                </h3>
                <div className="DFvkGh7X5w3Tc2YVuhsc">
                    <div className="DLthO24IR5yJeB6qXBm5">
                        <ButtonSaveArt articleId={articleId} />
                    </div>
                    <div className="Vf3BrfrGTlBJ9SqOawCQ">
                        <a className="AuRR3nlDzpNADbzhpaC1 baoayGCy5KTsiUdG7uGe" href={`/category/${categoryId}`}>{category}</a> - <span>{date}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default ArticleFollowed;
