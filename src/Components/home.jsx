import styles from '../Components/style.module.css';

import backup from'../assets/backup.png';

import React, { useState, useEffect, useRef } from "react";
 
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import classNames from 'classnames';

//import { ErrorBoundary } from "react-error-boundary";

import Navbar from './nav';
import Pagination from './Pagination';

const Home = () => {
    const [searchQuery, setGetSearchQuery] = useState('');
    const [searchedJob, setSearchedJob] = useState('');

    //const [seeMore, setSeeMore] = useState(false);

    const [values, onChange] = useState(new Date());

    const [value, setValue] = useState('');

    const [whatJob, setWhatJob] = useState('website%20developer');

    const [activeElement, setActiveElement] = useState('element1');
    const [returnedData, setGetReturnedData] = useState('');
    const [getCategories, setGetCategories] = useState('');

    const [getId, setGetId] = useState('0');
    const [valueId, setValueId] = useState('');

    const [visible, setVisible] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPost = Array.from([returnedData && returnedData.results]);
    const currentPost2 = Array.from(currentPost && currentPost[0]).slice(firstPostIndex, lastPostIndex);
    //console.log(currentPost2);

    const [currentSearchPage, setCurrentSearchPage] = useState(1);
    const [postPerSearchPage, setPostPerSearchPage] = useState(5);

    const lastSearchPostIndex = currentSearchPage * postPerSearchPage;
    const firstSearchPostIndex = lastSearchPostIndex - postPerSearchPage;
    const currentSearchPost = Array.from([searchQuery && searchQuery.results]);
    const currentSearchPost2 = Array.from(currentSearchPost && currentSearchPost[0]).slice(firstSearchPostIndex, lastSearchPostIndex);
    //console.log(currentSearchPost, 'search post')
    /*
    const [showUser, setUserShown] = useState(false);
    const [showInbox, setInboxShown] = useState(false);
    const [showNotif, setNotifShown] = useState(false);
    */

    const addImageFallback = (event) => {
        event.currentTarget.src = `${backup}`;
    };    
    //console.log(returnedData, 'home token');

    function Fallback({ error, resetErrorBoundary }) {
        // Call resetErrorBoundary() to reset the error boundary and retry the render.
    
        return (
            <div className={styles.cantFind} role="alert">
                <article>
                    <h1>What's that?</h1>

                    <div>
                        <p>Something went wrong:<br/> <span style={{ color: "red", textAlign: 'center' }}>Couldn't find recipe name</span></p>
                        <span style={{ color: "red", textAlign: 'center' }}>{error.message}</span>
                    </div>

                    <svg onClick={()=>setActiveElement('element3')} className={styles.svg} width="1.5em" height="1.5em" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.888 27.024L0.448 13.584L13.888 0.143998V7.488H34.672V19.68H13.888V27.024ZM12.448 23.52V18.24H33.232V8.928H12.448V3.648L2.512 13.584L12.448 23.52Z" fill="#e57b07"/>
                    </svg>
                </article>
            </div>
        );
    }

    const handleSearch = async (event) => {
        event.preventDefault();

        var app_id = '1e354264';
        var api_key = '82e48187c1b8adc498454f47de49c209';

        try {
            const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${app_id}&app_key=${api_key}&results_per_page=15&what=${searchedJob}&content-type=application/json`
                        
            const response = await fetch(url);
            const data = await response.json();
            if (response.staus !== 200) {
                setGetSearchQuery(data);
                //console.log(data, 'Search Query');
            } else {
                setGetSearchQuery("0 results Found");
                console.log('Server Error', data.error.message);
            }
        } catch (error) {
            setGetSearchQuery("0 results Found");
            console.log(error.name)
        }
    };

    const getJobsFeat = async (jobs) => {
        var app_id = '1e354264';
        var api_key = '82e48187c1b8adc498454f47de49c209';
        try {
            const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${app_id}&app_key=${api_key}&results_per_page=50&what=${jobs}&content-type=application/json`
            
            const response = await fetch(url);
            const data = await response.json();
            if (response.staus !== 200) {
                setGetReturnedData(data);
                //console.log(data, 'Featured');
            } else {
                console.log('Server Error', data.error.message);
            }
        } catch (error) {
            console.log(error.name)
        }
    };

    const getJobsCate = async (jobs) => {
        var app_id = '1e354264';
        var api_key = '82e48187c1b8adc498454f47de49c209';
        try {
            const url = `https://api.adzuna.com/v1/api/jobs/us/categories?app_id=${app_id}&app_key=${api_key}&content-type=application/json`
            
            const response = await fetch(url);
            const data = await response.json();
            if (response.staus !== 200) {
                setGetCategories(data);
                //console.log(data, 'Categories');
            } else {
                console.log('Server Error', data.error.message);
            }
        } catch (error) {
            console.log(error.name)
        }
    };

    useEffect(() => {
        getJobsFeat(whatJob);
        getJobsCate();
    }, [whatJob])

    //console.log(getId)
    var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];

    const arr2 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const arr = ['0', '1', '2', '3', '4'];

    const scrollingTo = useRef(null);
    
    function scroll(index){
        setGetId(index);
        scrollingTo.current.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const scrollingToResults = useRef(null);
    
    function scroll2(){
        scrollingToResults.current.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const getJob = (job, eleActive) => {
        setWhatJob(job);
        scroll2();
        setActiveElement(`element${eleActive}`)
    }

    function show(index, whatState){
        setVisible(whatState);
        setValueId(index);
    };

    //console.log(getJob)
    
    return(
        <main>
            <Navbar/>
            
            <section className={styles.landing}>
                <h1>Here to Help Get you <strong>Hired!</strong></h1>
                <p>Broke? Unemployed? Let us plug you in! Search for jobs by position or industry.</p>
                <form onSubmit={handleSearch} className={styles.form}>
                    <label htmlFor="search">
                        <input className={styles.searchInput} type="text" required placeholder="Search by position." id="search" value={searchedJob} onInput={(e)=>setSearchedJob(e.target.value)} />
                        <div className={styles.fancyBg} />
                        <div value={""} onClick={()=>setGetSearchQuery(value)} className={styles.searchIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <button title='Submit' type="submit" className={styles.searchBtn}>
                            <span>Find </span>
                            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.r14}>
                                <g>
                                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                                </g>
                            </svg>
                        </button>
                    </label>
                </form>

                <article className={classNames(styles.jobsCont, styles.changeGrid)}>
                    {searchQuery && currentSearchPost2 && currentSearchPost2.map((id, index) => {
                        return(
                            <div className={styles.foundJobBox} key={index} onMouseEnter={()=>show(index, true)} onMouseLeave={()=>show("", false)} /*onClick={()=>scroll(arr2[index])}*/>
                                <span key={index} className={styles.cities}>{id.location.area.map((id, i) => {
                                    return(
                                        <>
                                            <section key={i}>
                                                {id}
                                            </section>
                                        </>
                                    );
                                    })}
                                </span>
                                <img rel='preload preconnect' loading='lazy' src={`https://img.logo.dev/${id.company.display_name ? id.company.display_name.replace(/\s/g, ""): null}.com?token=pk_BI_U4iojSUSMZgsgPJI2ww&size=50`} onError={addImageFallback} width='50px' height='50px' alt='Company Logo'>
                                </img>
                                <span><strong>{id.company.display_name}</strong></span>
                                <h2>{id.title}</h2>
                                <p className={styles.truncate}>{id.description}</p>
                                
                                <span>{id.category.label}</span>
                                <article>
                                    <span className={styles.spanEm}>${Math.round(id.salary_min / 2080)} - ${Math.round(id.salary_max / 2080 + 2)} /hr</span>
                                    <span className={styles.spanEm}>{id.contract_type}</span>
                                </article>
                                <span className={styles.floatRight}>Created <strong>{months[parseInt(`${id.created.slice(5,8)}`)]} {id.created.slice(8,10)}-{id.created.slice(0,4)}</strong></span>
                                
                                {/*{visible && arr[index] == valueId ?*/}
                                    <article>
                                        <Link aria-label="Apply for job." exact="true" to={id.redirect_url}>
                                            <button className={styles.button} alt="apply">
                                                <i>a</i>
                                                <i>p</i>
                                                <i>p</i>
                                                <i>l</i>
                                                <i>y</i>
                                            </button>
                                        </Link>
                                    </article>
                                {/*    :
                                    null
                                }*/}
                            </div>
                        );
                    })}
                </article>

                <Pagination 
                    className={styles.searchPagination}
                    totalPosts={searchQuery && searchQuery.results.length} 
                    postsPerPage={postPerSearchPage} 
                    setCurrentPage={setCurrentSearchPage} 
                    scurrentPage={currentSearchPage}>
                </Pagination>
            </section>

            <section className={styles.jobs}>
                <h1>Featured <strong>Jobs</strong></h1>

                <div className={styles.tabCont}>
                    <p onClick={()=>getJob("website%20developer", 1)} className={activeElement === 'element1' ? styles.active : styles.none}>Website Developer</p>
                    <p onClick={()=>getJob("accountant", 2)} className={activeElement === 'element2' ? styles.active : styles.none}>Accountant</p>
                    <p onClick={()=>getJob("sales%20manager", 3)} className={activeElement === 'element3' ? styles.active : styles.none}>Sales Manager</p>
                    <p onClick={()=>getJob("esthetician", 4)} className={activeElement === 'element4' ? styles.active : styles.none}>Esthetician</p>
                    <p onClick={()=>getJob("barber", 5)} className={activeElement === 'element5' ? styles.active : styles.none}>Barber</p>
                    <p onClick={()=>getJob("retail%20sales%20associate", 6)} className={activeElement === 'element6' ? styles.active : styles.none}>Retail Sales Associate</p>
                </div>

                <article className={styles.featJobs}>
                    <article className={styles.featGrid}>
                        <article ref={scrollingToResults} className={styles.jobsCont}>
                            {returnedData && currentPost2 && currentPost2.map((id, index) => {
                                //console.log(id)
                                return(
                                    <div className={classNames(arr2[index] === getId ? styles.activeBox : styles.none, styles.foundJobBox)} key={index} onClick={()=>scroll(arr2[index])}>
                                        <span key={index} className={styles.cities}>{id.location.area.map((id, i) => {
                                            return(
                                                <>
                                                    <section key={i}>
                                                        {id}
                                                    </section>
                                                </>
                                            );
                                            })}
                                        </span>
                                        <img rel='preload preconnect' loading='lazy' src={`https://img.logo.dev/${id.company.display_name ? id.company.display_name.replace(/\s/g, ""): null}.com?token=pk_BI_U4iojSUSMZgsgPJI2ww&size=50`} onError={addImageFallback} width='50px' height='50px' alt='Company Logo'>
                                        </img>
                                        <span><strong>{id.company.display_name}</strong></span>
                                        
                                        <h2>{id.title}</h2>
                                        <span>{id.category.label}</span>
                                        <article>
                                            <span className={styles.spanEm}>${Math.round(id.salary_min / 2080)} - ${Math.round(id.salary_max / 2080 + 2)} /hr</span>
                                            <span className={styles.spanEm}>{id.contract_type}</span>
                                        </article>
                                        <span className={styles.floatRight}>Created <strong>{months[parseInt(`${id.created.slice(5,8)}`)]} {id.created.slice(8,10)}-{id.created.slice(0,4)}</strong></span>
                                    </div>
                                );
                            })}
                        </article>

                        <article className={styles.calendar}>
                            <Calendar className={styles.calendarItem} calendarType={'hebrew'} onChange={onChange} value={values}  />
                            <h1>Career <strong>Areas</strong></h1>
                            <div className={styles.jobCateg}>
                                {getCategories && getCategories.results.map((id, index) => {
                                    return(
                                        <span key={index}>{id.label}</span>
                                    );
                                })}
                            </div>
                        </article>
                    </article>

                    <Pagination 
                        totalPosts={returnedData && returnedData.results.length} 
                        postsPerPage={postPerPage} 
                        setCurrentPage={setCurrentPage} 
                        scurrentPage={currentPage}>
                    </Pagination>

                    <article ref={scrollingTo} className={styles.clickedJob}>
                        <span className={styles.cities}>{returnedData && currentPost2 && currentPost2[getId ? getId : 0].location.area.map((id, i) => {
                            return(
                                <>
                                    <section key={i}>
                                        {id}
                                    </section>
                                </>
                            );
                            })}
                        </span>
                        <h2><strong>{returnedData && currentPost2 && currentPost2[getId ? getId : 0].company.display_name}</strong></h2>
                        <h1>{returnedData && currentPost2 && currentPost2[getId ? getId : 0].title}</h1>
                        <p>{returnedData && currentPost2 && currentPost2[getId ? getId : 0].description}</p>
                        <article>
                            <Link aria-label="Apply for job." exact="true" to={returnedData && currentPost2 && currentPost2[getId ? getId : 0].redirect_url}>
                            <button className={styles.button} alt="apply">
                                <i>a</i>
                                <i>p</i>
                                <i>p</i>
                                <i>l</i>
                                <i>y</i>
                            </button>
                            </Link>
                        </article>
                    </article>
                </article>
            </section>
        </main>
    );
}

export default Home;