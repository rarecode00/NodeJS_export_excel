import React, { useState } from "react";
import axios from "axios";

const Uploader = () => {
  const [file, setFile] = useState(null);
  const [done, setDone] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    const data = new FormData();
    data.append("excelFile", file);

    axios
      .post("http://localhost:5000/upload", data)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setDone(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="uploader">
      <div className= {done ? "d-none" : ""}>
        <input type="file" onChange={handleChange} />
        <div>
          <button className={file ? "" : "d-none"} onClick={handleUpload}>Submit</button>
        </div>
      </div>

      <div className={done ? "d-i" : "d-none"}>
         <div>Thank You!</div>
         <div>File SuccessFully Uploaded</div>
         <div>Your records will be processed Shortly</div>
      </div>
    </div>
  );
};

export default Uploader;
