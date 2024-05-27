import React, { useRef, useState } from "react";
import styled from "styled-components";
import "@tensorflow/tfjs-backend-cpu";
import * as cocoSsd from "@tensorflow-models/coco-ssd";


const ObjectDetectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HiddenFileInput = styled.input.attrs({
  type: 'file',
})`
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

export function SearchImage({ setSearchKeyword }) {
  const fileInputRef = useRef();
  const [isLoading, setLoading] = useState(false);

  const openFilePicker = () => {
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
    console.log("Predictions: ", predictions);
    setSearchKeyword(classNames); // Cập nhật giá trị searchKeyword
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

  return (
    <ObjectDetectorContainer>
      <HiddenFileInput
        ref={fileInputRef}
        onChange={onSelectImage}
      />
      <SelectButton onClick={openFilePicker}>
        {isLoading ? "Recognizing..." : "Select Image"}
      </SelectButton>
    </ObjectDetectorContainer>
  );
}
