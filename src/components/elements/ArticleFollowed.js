import React from 'react';

const ArticleFollowed = ({ title, imageUrl, category, date }) => (

    <article className="T4C8M7gx47SgNVdeaEo5">
        <div className="cejlglTblCkKqUv8Qao3">
            <a href={'/'}><img src={imageUrl} alt={title} /></a>
        </div>
        <div>
            <h3 className="cenTMdraIxX2mUpD2iEA">
                <div className="col-1-title"><a href={'/'}>{title}</a></div>
            </h3>
            <div className="DFvkGh7X5w3Tc2YVuhsc">
                <div className="DLthO24IR5yJeB6qXBm5">
                    <li className="save-icon">
                        <a href="#" style={{
                            fontSize: '1rem',
                            color: "black",
                            marginRight: '20px',
                        }} title="save" >
                        </a>
                    </li>
                </div>
                <div className="Vf3BrfrGTlBJ9SqOawCQ">
                    <a className="AuRR3nlDzpNADbzhpaC1 baoayGCy5KTsiUdG7uGe" href={`/${category}.htm`}>{category}</a> - <span>{date}</span>
                </div>
            </div>
        </div>
       
    </article>
    

);

export default ArticleFollowed;
