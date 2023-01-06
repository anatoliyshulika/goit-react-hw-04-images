import { useState, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Box from './Box/Box';
import fetchData from 'services/api';
import { Container } from './App.styled';
import { animateScroll as scroll } from 'react-scroll';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [imgList, setImgList] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const totalPages = useRef(0);
  const FirstLoadRef = useRef(0);

  useEffect(() => {
    if (FirstLoadRef.current < 2) {
      FirstLoadRef.current += 1;
      return;
    }

    setStatus('pending');
    fetchData(searchValue, page)
      .then(({ totalPage, imgList }) => {
        if (page === 1) {
          totalPages.current = totalPage;
          setImgList(imgList);
        } else {
          setImgList(prevImgList => [...prevImgList, ...imgList]);
          scroll.scrollMore(576);
        }
        setStatus('resolved');
      })
      .catch(error => {
        setError(error.response.data);
        setStatus('rejected');
      });
  }, [page, searchValue]);

  function handleSubmit(values) {
    setSearchValue(values.search);
    setImgList([]);
    setPage(1);
  }

  function getNextPage() {
    setPage(prevPage => prevPage + 1);
  }

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />
      {imgList.length > 0 && <ImageGallery imgList={imgList} />}
      {totalPages.current > 1 && totalPages.current > page && (
        <Button handleClick={getNextPage} />
      )}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && (
        <>
          <Box
            width="100%"
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <h1>Something went wrong, please reload this page</h1>
          </Box>
          {toast.error(error)}
        </>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
    </Container>
  );
}
