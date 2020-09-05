import React from 'react';

import Navbar from '../Navbar';
import styles from './BackgroundLayout.module.scss';

const BackgroundLayout: React.FC = (props) => {
  const { children } = props;

  return (
    <section className={`hero is-fluid is-fullheight ${styles.background}`}>
      <div className={`hero-head ${styles.heroHead}`}>
        <Navbar />
      </div>
      <div className="hero-body">{children}</div>
      <div className={`hero-footer ${styles.footer}`}>
        <span className="tag">
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
  );
};

export default BackgroundLayout;
