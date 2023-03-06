import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImgList from './components/ImgList';
import UploadImg from './components/UploadImg';
import axios from 'axios';

function App() {
  const baseURL = 'http://localhost:3004';

  const [attachment, setAttachment] = useState('');
  const [images, setImages] = useState([]);
  const getImages = async () => {
    await axios.get(`${baseURL}/img`).then((res) => {
      setImages(res.data);
    });
  };

  useEffect(() => {
    getImages();
  }, [attachment]);

  return (
    <Container>
      <UploadImg attachment={attachment} setAttachment={setAttachment} />
      <ImgList images={images} />
    </Container>
  );
}

const Container = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  padding: 1rem;
  gap: 1rem;
  section {
    width: 50%;
    height: 100%;
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 1rem;
  }
`;

export default App;
