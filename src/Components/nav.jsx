import styles from '../Components/style.module.css';

import React/*, { useState, useEffect }*/ from "react";
 
import { Link } from 'react-router-dom';

import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
    //const [activeElement, setActiveElement] = useState('element1');
    //const [returnedData, setGetReturnedData] = useState('');

    //const [visible, setVisible] = useState(false);
    /*
    const [showUser, setUserShown] = useState(false);
    const [showInbox, setInboxShown] = useState(false);
    const [showNotif, setNotifShown] = useState(false);
    */

    //console.log(returnedData, 'home token');

    return(
        <>
            <nav>
                <div>
                    <h1>
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.5 8.25V18C20.5 21 18.71 22 16.5 22H8.5C6.29 22 4.5 21 4.5 18V8.25C4.5 5 6.29 4.25 8.5 4.25C8.5 4.87 8.74997 5.43 9.15997 5.84C9.56997 6.25 10.13 6.5 10.75 6.5H14.25C15.49 6.5 16.5 5.49 16.5 4.25C18.71 4.25 20.5 5 20.5 8.25Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.5 4.25C16.5 5.49 15.49 6.5 14.25 6.5H10.75C10.13 6.5 9.56997 6.25 9.15997 5.84C8.74997 5.43 8.5 4.87 8.5 4.25C8.5 3.01 9.51 2 10.75 2H14.25C14.87 2 15.43 2.25 15.84 2.66C16.25 3.07 16.5 3.63 16.5 4.25Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path opacity="0.4" d="M8.5 13H12.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path opacity="0.4" d="M8.5 17H16.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Need<strong>AJob?</strong>
                    </h1>

                    <ul>
                        <li className={window.location.pathname == "/" ? styles.active : null}><Link aria-label="Go to home page." exact="true" to="/">Find Jobs</Link></li>
                        <li className={window.location.pathname == "/salaries" ? styles.active : null}><Link aria-label="Go to salaries page." exact="true" to="/salaries">Find Salaries</Link></li>
                        <li><Link aria-label="Go to adzuna api page." exact="true" to="https://developer.adzuna.com/">Adzuna Api</Link></li>
                    </ul>
                </div>

                <div>
                    <HashLink to="/#search">
                        <button className={styles.button} alt="Find Jobs">
                            <i>F</i>
                            <i>i</i>
                            <i>n</i>
                            <i>d</i>
                            <i>&nbsp;</i>
                            <i>J</i>
                            <i>o</i>
                            <i>b</i>
                            <i>s</i>
                        </button>
                    </HashLink>
                </div>
            </nav>
        </>
    );
}

export default Navbar;