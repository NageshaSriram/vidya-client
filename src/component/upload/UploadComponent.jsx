import React, { useState } from "react";
import "antd/dist/antd.css";
import ApiService from '../../service/ApiService';
import ImgCrop from 'antd-img-crop';

import { Upload } from "antd";
import {CloudUploadOutlined} from "@ant-design/icons";
const Uploader = ({getFileId}) => {
    const [defaultFileList, setDefaultFileList] = useState([]);
  
    const uploadImage = async options => {
      const { onSuccess, onError, file } = options;
  
      const fmData = new FormData();
      fmData.append("image", file);
      try {
        
          ApiService.uploadFile(file).then(data => {
            getFileId(data);
          });
  
        onSuccess("Ok");
      } catch (err) {
        console.log("Eroor: ", err);
        onError({ err });
      }
    };
  
    const handleOnChange = ({ file, fileList, event }) => {
      setDefaultFileList(fileList);
    };
  
    return (

  
  <ImgCrop rotate>
  <Upload
    accept="image/*"
    customRequest={uploadImage}
    onChange={handleOnChange}
    listType="picture-card"
    defaultFileList={defaultFileList}
  >
  {defaultFileList.length >= 1 ? null : <CloudUploadOutlined />}
  </Upload>
  </ImgCrop>
  
    );
  };

  export default Uploader;