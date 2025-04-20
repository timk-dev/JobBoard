import React, { useState, useEffect } from 'react';
import styles from '../Components/style.module.css';

import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'

import Navbar from './nav';

const Salaries = () => {
    const [getDetails, setGetDetails] = useState('');
    const [top5Job, setTop5Job] = useState('');
    const [categoryJob, setCategoryJob] = useState('');

    const [salaryData, setSalaryData] = useState('');

    const [getCategories, setGetCategories] = useState('');

    const [openSearch, setOpenSearch] = useState(false);

    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 36rem)").matches
    )

    const [tablet, setTablet] = useState(
        window.matchMedia("(max-width: 838px)").matches
    )

    const getSalaryDetails = async () => {
        var app_id = '1e354264';
        var api_key = '82e48187c1b8adc498454f47de49c209';
        try {
            const url = `https://api.adzuna.com/v1/api/jobs/us/top_companies?app_id=${app_id}&app_key=${api_key}&what=${top5Job}&content-type=application/json`
            
            const response = await fetch(url);
            const data = await response.json();
            if (response.staus !== 200) {
                setGetDetails(data);
                //console.log(data, 'Details');
            } else {
                console.log('Server Error', data.error.message);
            }
        } catch (error) {
            console.log(error.name)
        }
    };
    
    const getSalaryJobsCate = async () => {
        var app_id = '1e354264';
        var api_key = '82e48187c1b8adc498454f47de49c209';
        try {
            const url = `https://api.adzuna.com/v1/api/jobs/us/history?app_id=${app_id}&app_key=${api_key}&category=${categoryJob}&content-type=application/json`
            
            const response = await fetch(url);
            const data = await response.json();
            if (response.staus !== 200) {
                setSalaryData(data);
                //console.log(data, 'Salary Data for Category');
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
        getSalaryDetails();
        getJobsCate();
        getSalaryJobsCate();

        window
        .matchMedia("(max-width: 36rem)")
        .addEventListener('change', e => setMatches( e.matches ));
        
        window
        .matchMedia("(max-width: 838px)")
        .addEventListener('change', e => setTablet( e.tablet ));
    }, [top5Job, categoryJob])

    const chartData = {
        labels: ["2024-03", "2024-04", "2024-05", "2024-06",
                "2024-07", "2024-08", "2024-09", "2024-10",
                "2024-11", "2024-12", "2025-01", "2025-02",
        ],
        datasets: [
          {
            label: "Salary in USD",
            data: [
                salaryData && salaryData.month["2024-03"], salaryData && salaryData.month["2024-04"], salaryData && salaryData.month["2024-05"],
                salaryData && salaryData.month["2024-06"], salaryData && salaryData.month["2024-07"], salaryData && salaryData.month["2024-08"],
                salaryData && salaryData.month["2024-09"], salaryData && salaryData.month["2024-10"], salaryData && salaryData.month["2024-11"],
                salaryData && salaryData.month["2024-12"], salaryData && salaryData.month["2025-01"], salaryData && salaryData.month["2025-02"],
                ],
            fill: false,
            backgroundColor: "#e63a3d",
            borderColor: "#00000065",
            color: "#000",
          },
        ],
      };

    const arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11",
            "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",
            "24", "25", "26", "27", "28", "29"
    ]

    return (
        <main className={styles.salary}>
            <Navbar />

            <section className={styles.jobs}>
                <h1>Salary <strong>Data</strong></h1>
                <article className={styles.featJobs}>
                    <h1 className={styles.h1Search}>
                        Find the Top 5 companies hiring for a{'(n)'} 
                        <strong>
                            {top5Job && openSearch ?
                                top5Job
                            :
                                <form className={styles.form}>
                                    <label htmlFor="search">
                                        <input className={styles.searchInput} type="text" required placeholder="Search by position." id="search" value={top5Job} onInput={(e)=>setTop5Job(e.target.value)} />
                                        <div className={styles.fancyBg} />
                                        <div value={""} onClick={()=>setTop5Job(value)} className={styles.searchIcon}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </label>
                                </form>
                            }
                            <button onClick={()=>setOpenSearch(current => !current)} className={styles.searchBtn}>
                                <p>change</p>
                            </button>
                        </strong> 
                        positon.
                    </h1>

                    <div className={styles.top5}>
                        {getDetails && getDetails.leaderboard.map((id, index) => {
                            return(
                                <article className={styles.top5Item} key={index}>
                                    <p>{id.canonical_name}</p>
                                    <p>{id.count}</p>
                                    <div className={styles.bar}></div>
                                    <div className={styles.gridBack}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                    
                    <h1 className={styles.h1Search}>
                        Average salary for 
                        <strong>
                            {getCategories && 
                                <select
                                    //onClick={() => getTvs(filterParamTv[0])}
                                    onChange={(e)=>setCategoryJob(e.target.value)}
                                    className="custom-select"
                                    aria-label="Filter Categories"
                                    >
                                    <option value="">Category</option>
                                    {getCategories && getCategories.results.map((id, index)=>{
                                        return(
                                            <option key={arr[index]} value={id.tag}>{id.label}</option>
                                        );
                                    })}
                                </select>
                            }
                        </strong> 
                        .
                    </h1>

                    <div>
                        {matches ?
                            <Line options={{ maintainAspectRatio: true }} width="350" height="400" className={styles.chart} data={chartData} />
                        :   
                            <Line options={{ maintainAspectRatio: true }} width={tablet ? "700" : "1000"} height={tablet ? "400" : "500"} className={styles.chart} data={chartData} />
                        }
                    </div>
                </article>
            </section>
        </main>
    );
};

export default Salaries;