import React from 'react';
import {Link} from 'redux-little-router';

const NavBar = () => (
  <nav className="bg-near-black ph5 pv3 ttu f5 fw6">
    <Link href="/" className="link underline-hover near-white">
      Home
    </Link>
  </nav>
);

export default NavBar;
