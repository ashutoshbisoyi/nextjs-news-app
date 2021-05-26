import React, { useState } from 'react';
import styles from '../../../styles/Feed.module.css';
import { useRouter } from 'next/router';
import ReactImageFallback from 'react-image-fallback';
import Head from 'next/head';
import { GiPartyFlags, GiHealthNormal } from 'react-icons/gi';
import Image from 'next/image';
import {
  FaBusinessTime,
  FaArchway,
  FaCogs,
  FaCompass,
  FaChessKnight,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaSearch,
} from 'react-icons/fa';
const SearchResults = ({ apiJson, pageNumber, url }) => {
  const [searchTerm, setSearchTerm] = useState();
  const router = useRouter();
  const maxPage = Math.ceil(apiJson.totalResults / 10);
  const { searchterm } = router.query;
  const handleSearch = () => {
    router.push(`/search/${searchTerm.replace(/ +/g, '')}/1`);
  };
  return (
    <div className='container'>
      <Head>
        <title>News Wave-Search results for {searchterm}</title>
        <meta
          name='description'
          content='The News Wave - Your one stop news destination. Get latest news updates within 1hour from 8 top catagories like entertainment, sports, business and more.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className={styles.header}>
        <h1>The News Wave</h1>
        <ul>
          <li onClick={() => router.push('/feed/general/1')}>Feed</li>
          <li
            onClick={() =>
              (location.href = 'https://www.linkedin.com/in/ashutoshbisoyi/')
            }
          >
            Developer
          </li>
        </ul>
      </header>
      <div className={styles.catagoryWrapper}>
        <div>
          <h2>Select Catagory</h2>
          <ul>
            <li
              onClick={() => {
                router.push(`/feed/general/1`);
              }}
            >
              <FaArchway />
              <p>General</p>
            </li>
            <li
              onClick={() => {
                router.push(`/feed/business/1`);
              }}
            >
              <FaBusinessTime />
              <p>Business</p>
            </li>
            <li
              onClick={() => {
                router.push(`/feed/entertainment/1`);
              }}
            >
              <GiPartyFlags />
              <p>Entertainment</p>
            </li>

            <li
              onClick={() => {
                router.push(`/feed/health/1`);
              }}
            >
              <GiHealthNormal />
              <p>Health</p>
            </li>
            <li
              onClick={() => {
                router.push(`/feed/science/1`);
              }}
            >
              <FaCompass />
              <p>Science</p>
            </li>
            <li
              onClick={() => {
                router.push(`/feed/sports/1`);
              }}
            >
              <FaChessKnight />
              <p>Sports</p>
            </li>
            <li
              onClick={() => {
                router.push(`/feed/technology/1`);
              }}
            >
              <FaCogs />
              <p>Technology</p>
            </li>
          </ul>
        </div>
        <div>
          <h2>Search Topic</h2>
          <input
            type='text'
            placeholder='Search Here'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button onClick={() => handleSearch()}>
            <FaSearch />
          </button>
        </div>
      </div>
      <h2 className={styles.feedHeading}>
        Your search result for "{searchterm}"
      </h2>
      {apiJson.articles && apiJson.articles.length >= 1 ? (
        <div className={styles.articleContainer}>
          {apiJson.articles.map((value, index) => {
            return (
              <div className={styles.articleCard} key={index}>
                <ReactImageFallback
                  src={value.urlToImage}
                  fallbackImage='https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'
                  initialImage='https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                  alt='image'
                  className={styles.image}
                />
                <h1>{value.title}</h1>
                <p className={styles.publishedAt}>{value.publishedAt}</p>
                <p>{value.description}</p>
                <button
                  onClick={() => {
                    window.location.href = value.url;
                  }}
                >
                  Read Full Article
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.empty}>
          <div>
            <Image src='/img2.png' width={200} height={200} alt='img' />
            <h4>Oops! No news for "{searchterm}"</h4>
            <p>
              Try again with a new term or{' '}
              <span onClick={() => router.push('/feed/general/1')}>
                click here
              </span>{' '}
              to start reading.
            </p>
          </div>
        </div>
      )}
      <div className={styles.paginationBar}>
        <div
          className={pageNumber > 1 ? styles.active : styles.disabled}
          onClick={() => {
            pageNumber > 1 ? router.push(`${pageNumber - 1}`) : '';
          }}
        >
          <FaAngleDoubleLeft className='icon' />
          Previous
        </div>
        <p>{pageNumber}</p>
        <div
          className={pageNumber < maxPage ? styles.active : styles.disabled}
          onClick={() => {
            pageNumber < maxPage ? router.push(`${pageNumber + 1}`) : '';
          }}
        >
          Next <FaAngleDoubleRight className='icon' />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageNumber = pageContext.query.slug;
  const searchTerm = pageContext.query.searchterm;
  let apiJson = [];

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        apiJson,
        pageNumber: 1,
      },
    };
  }

  const url = `https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=popularity&apiKey=fba24b2484974aa5893d35c28f597364&pageSize=10&page=${pageNumber}`;

  const apiResponse = await fetch(url);

  apiJson = await apiResponse.json();

  return {
    props: {
      apiJson,
      pageNumber: Number.parseInt(pageNumber),
      url,
    },
  };
};

export default SearchResults;
