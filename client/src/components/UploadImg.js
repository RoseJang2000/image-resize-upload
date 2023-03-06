import axios from 'axios';
import { useRef, useState } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';
import Resizer from 'react-image-file-resizer';
import styled from 'styled-components';

const baseURL = 'http://localhost:3004';

const UploadImg = ({ attachment, setAttachment }) => {
  const fileInput = useRef();
  const [inputValue, setInputValue] = useState(0);

  const resizeImg = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64'
      );
    });

  const onChangeImg = async (event) => {
    event.preventDefault();
    const originalImg = event.target.files[0];
    const resizedImage = await resizeImg(originalImg);
    setAttachment(resizedImage);
  };

  const onClearAttachment = () => {
    setAttachment('');
    fileInput.current.value = '';
  };

  const onUploadAttachment = async () => {
    await axios
      .post(`${baseURL}/img`, {
        img: attachment,
      })
      .then((res) => {
        console.log(res.data);
        onClearAttachment();
      });
  };

  const onDeleteImg = async () => {
    await axios
      .delete(`${baseURL}/img`, {
        params: {
          id: inputValue,
        },
      })
      .then((resp) => {
        console.log(resp.data);
        onClearAttachment();
      });
  };

  const onPatchImg = async () => {
    await axios
      .patch(
        `${baseURL}/img`,
        {
          img: attachment,
        },
        {
          params: {
            id: inputValue,
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        onClearAttachment();
      });
  };

  return (
    <section>
      {/* <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FaPlus />
      </label> */}
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onChangeImg}
        // style={{
        //   opacity: 0,
        // }}
        ref={fileInput}
      />
      {attachment && (
        <UploadedImgContainer>
          <UploadedImg>
            <img
              src={attachment}
              style={{
                backgroundImage: attachment,
              }}
              alt="img"
            />
          </UploadedImg>
          <ButtonsWrapper>
            <div className="factoryForm__clear" onClick={onClearAttachment}>
              <span>Remove</span>
              <FaTimes />
            </div>
            <div onClick={onUploadAttachment}>
              <span>Upload</span>
            </div>
          </ButtonsWrapper>
          <ButtonsWrapper>
            <div>
              <span>id: </span>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <DeleteAndPatch>
              <span onClick={onDeleteImg}>delete</span>
              <span onClick={onPatchImg}>patch</span>
            </DeleteAndPatch>
          </ButtonsWrapper>
        </UploadedImgContainer>
      )}
    </section>
  );
};

const UploadedImgContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const UploadedImg = styled.div`
  width: fit-content;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
  align-items: center;
  > div {
    > span {
      cursor: pointer;
    }
  }
`;

const DeleteAndPatch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export default UploadImg;
