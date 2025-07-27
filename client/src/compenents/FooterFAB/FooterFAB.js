import React, { Fragment } from 'react'
import { GitHub, Instagram, LinkedIn, Mail } from '@mui/icons-material';
import { Box } from '@mui/material';
import classes from './FooterFAB.module.css';

const Footer = () => {

    const clickHandler = (link, name) => {
        window.open(link, '_blank');
    }

    return (
        <Fragment>
            <div className={classes.container}>
                <Box sx={{ borderBottom: '1.5px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', paddingBottom: '10px', marginBottom: '10px' }}>
                    <span onClick={() => clickHandler("https://www.instagram.com/ft.chavhan", 'Instagram')}>
                        <Instagram className={classes.logos} />
                    </span>
                    <span onClick={() => clickHandler("https://github.com/atharvachavhan", 'Github')}>
                        <GitHub className={classes.logos} />
                    </span>
                    <span onClick={() => clickHandler("https://www.linkedin.com/in/atharva-chavhan-b28728252", 'LinkedIn')}>
                        <LinkedIn className={classes.logos} />
                    </span>
                    <span onClick={() => clickHandler("mailto:chavhanayc@gmail.com", 'Mail')}>
                        <Mail className={classes.logos} />
                    </span>
                </Box>
            </div>
            <div className={classes.footerContent}>
                <div>Copyright © {new Date().getFullYear()} All rights reserved</div>
                <div>Made for AlgoUni by <a href="https://www.linkedin.com/in/atharva-chavhan-b28728252/" target="_blank" rel="noopener noreferrer">
                    Atharva Chavhan
                </a></div>
                <div> For more detail visit <a href="https://github.com/atharvachavhan" target="_blank" rel="noopener noreferrer">
                     <span style={{ color: 'black' }}>on</span> GitHub
                </a></div>
            </div>
        </Fragment>
    )
}

export default Footer;