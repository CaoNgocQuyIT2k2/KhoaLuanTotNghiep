import React, { useRef, useState } from "react";
import styled from "styled-components";

import "@tensorflow/tfjs-backend-cpu";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

const ObjectDetectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HiddenFileInput = styled.input`
  display: none;
`;



const SelectButton = styled.button`
  padding: 7px 10px;
  border: 2px solid transparent;
  background-color: #fff;
  color: #0a0f22;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  margin-top: 2em;
  cursor: pointer;
  transition: all 260ms ease-in-out;

  &:hover {
    background-color: transparent;
    border: 2px solid #fff;
    color: #fff;
  }
`;

const SearchImage = ({ setSearchKeyword }) => {
  const fileInputRef = useRef();
  const [classNames, setClassNames] = useState("");
  const [isLoading, setLoading] = useState(false);

  const openFilePicker = (e) => {
    e.preventDefault();  // Thêm dòng này để ngăn chặn hành vi mặc định
    if (fileInputRef.current) fileInputRef.current.click();
  };
  

  const getClassNames = (predictions) => {
    if (!predictions || predictions.length === 0) {
      return "No objects detected";
    } else {
      const uniqueClassNames = Array.from(new Set(predictions.map(prediction => prediction.class)));
      return uniqueClassNames.join(", ");
    }
  };

  const detectObjectsOnImage = async (imageElement) => {
    const model = await cocoSsd.load({});
    const predictions = await model.detect(imageElement, 6);
    const classNames = getClassNames(predictions);
    setSearchKeyword(classNames);

  };
  
  const readImage = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = () => reject(fileReader.error);
      fileReader.readAsDataURL(file);
    });
  };

  const onSelectImage = async (e) => {
    setClassNames("");
    setLoading(true);

    const file = e.target.files[0];
    const imgData = await readImage(file);

    const imageElement = document.createElement("img");
    imageElement.src = imgData;

    imageElement.onload = async () => {
      await detectObjectsOnImage(imageElement);
      setLoading(false);
    };
  };
  const spinnerIcon = (
    <svg style={{
        display: "inline-block",
        width: "24px",
        height: "24px",
       color:"black",
       background:"none !important",
       border:"none !important" ,
    }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#000000" stroke="#000000" strokeWidth="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#000000" stroke="#000000" strokeWidth="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#000000" stroke="#000000" strokeWidth="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
  );



  return (
    <ObjectDetectorContainer>
      <HiddenFileInput 
      className="HiddenFileInput"
        type="file"
        ref={fileInputRef}
        onChange={onSelectImage}
        style={{
          display:"none"
        }}
      />
      <SelectButton style={{
        marginTop: "1.5rem",
      }} onClick={openFilePicker}>
      {isLoading ? <i className="">{spinnerIcon}</i> : <i style={{
        backgroundColor: "#f9f9f9",
        border:"none",
      }} title="Search Image" className="fa-solid fa-image"></i>}
      </SelectButton>
    </ObjectDetectorContainer>
  );
};

export default SearchImage;
