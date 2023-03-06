import styled from 'styled-components';

const ImgList = ({ images }) => {
  return (
    <Container>
      {images.map((img) => (
        <ImageWrapper key={img.id}>
          <p>{img.id}</p>
          <StyledImg src={img.img} />
        </ImageWrapper>
      ))}
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ImageWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledImg = styled.img`
  width: 200px;
`;

export default ImgList;
