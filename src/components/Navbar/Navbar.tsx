import Link from 'next/link';
import React from 'react';

import { useUser } from '../../utils/hooks';

const Navbar: React.FC = () => {
  const { data, mutate } = useUser();
  const [isActive, setIsActive] = React.useState(false);

  const handleOnSignoutClick = async () => {
    await fetch('/api/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await mutate(null);
  };

  const isActiveClass = isActive ? 'is-active' : '';

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">
            <h1 className="title">TDEE Online</h1>
          </a>
        </Link>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          role="button"
          tabIndex={0}
          className={`navbar-burger burger ${isActiveClass}`}
          data-target="navbarBasicExample"
          onClick={() => {
            setIsActive(!isActive);
          }}
          onKeyDown={(event) => {
            if (event.key !== 'Tab') setIsActive(!isActive);
          }}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className={`navbar-menu${isActiveClass}`}>
        <div className="navbar-start">
          <Link href="/">
            <a className="navbar-item">Home</a>
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!data ? (
                <>
                  <Link href="/signup">
                    <a className="button has-background-primary-dark">
                      <strong>Sign up</strong>
                    </a>
                  </Link>
                  <Link href="/signin">
                    <a className="button has-text-dark has-background-grey-lighter">Sign in</a>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    className="button has-text-dark has-background-grey-lighter"
                    onClick={handleOnSignoutClick}>
                    Sign out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
