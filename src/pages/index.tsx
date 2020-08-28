import React from 'react';

import Navbar from '../components/Navbar';
import styles from './index.module.scss';

const Index: React.FC = () => {
  return (
    <>
      <Navbar />
      <section className={`hero is-fullheight ${styles.background}`}>
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1">TDEE Online</h1>
            <h3 className="subtitle is-3">Eat. Track. Progress.</h3>
          </div>
          <span className={`tag ${styles.credit}`}>
            Photo by &nbsp;
            <a href="https://unsplash.com/@brett_jordan?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
              Brett Jordan
            </a>
            &nbsp;on&nbsp;
            <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
              Unsplash
            </a>
          </span>
        </div>
      </section>
    </>
  );
};

export default Index;
