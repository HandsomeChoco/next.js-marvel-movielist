import Link from 'next/link';
import Head from 'next/head';
import style from './layout.module.css';
import react from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function SideBar() {
  return(
    <div id={sidebar.container}>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}

export default SideBar;
