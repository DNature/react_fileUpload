import React, { useState, Fragment } from 'react';
import Dummy from './Dummy';
import Progress from './Progress';
import Message from './Message';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  //! Handle Changes
  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  //! Handle Submit
  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: ProgressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            )
          );
          setTimeout(() => setUploadPercentage(0), 10000)
        }
      });

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      setMessage('File Uploaded')
    } catch (err) {
      err.response.status === 500
        ? setMessage('There was a problem with the server')
        : setMessage(err.response.data.msg);
    }
  };

  return (
    <Fragment>
    {message ? <Message msg={message} /> : null}
      <form onSubmit={handleSubmit}>
        <div className="custom-file mt-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label htmlFor="customFile" className="custom-file-label">
            {fileName}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type="submit"
          value="Upload"
          className="btn btn-success btn-block mt-4"
        />
      </form>

      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <img
              src={uploadedFile.filePath}
              style={{ width: '100%' }}
              alt={uploadedFile.fileName}
            />
            <p className="text-center">{uploadedFile.fileName}</p>
          </div>
        </div>
      ) : null}
      <Dummy />
    </Fragment>
  );
};

export default FileUpload;
