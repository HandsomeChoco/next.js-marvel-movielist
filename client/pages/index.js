import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
export default function Home() {
  return (
    <Layout title={'index'}></Layout>
  );

}
