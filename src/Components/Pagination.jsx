import React from 'react';
import styles from '../Components/style.module.css';

const Pagination = ({totalPosts, postsPerPage, setCurrentPage, scurrentPage}) => {
    let pages = [];
    
    for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        //Math.ceil rounds the numer up.
        pages.push(i);
    }
    return (
        <section className={styles.paginationContainer}>
            {
                pages.map((page, index) => {
                    return <section className={`${styles.number}
                    ${page == scurrentPage ? `${styles.active}` : ''}
                    `} onClick={() => setCurrentPage(page)} key={index}><h2>{page}</h2></section>
                }
            )}
        </section>
    );
};

export default Pagination;