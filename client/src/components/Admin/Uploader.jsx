import React, { useState } from "react";
import axios from "axios";
import { BiImageAdd } from "react-icons/bi";
import styles from './Uploader.module.css'

function ImageUploader({ images, setImages }) {
  const [progress, setProgress] = useState(0);
  const [progressVisible, setProgressVisible] = useState(false);

  const handleUploadImage = async (files) => {
    let arrAux = [];
    if (files.length > 6 - images.length) {
      var iterations = 6 - images.length;
    } else {
      var iterations = files.length;
    }
    for (let i = 0; i < iterations; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", "shoesphotos");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/davoshoes/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress(e) {
            setProgressVisible(true);
            setProgress((e.loaded * 100) / e.total);
          },
        }
      );
      arrAux.push(res.data.url);
      setProgress(0);
      setProgressVisible(false);
      setImages(
        [...images, ...arrAux],
      );
    }
  };

  const handleOnClose = (e) => {
    e.preventDefault()
    setImages(
        images.filter((src) => src !== e.target.value),
    );
  };

  return (
    <div className={styles.imgUploaderContainer} >
      <div  className={styles.cardPreviewer} >
        {images.map((url, i) => {
          return (
            <div  className={styles.imgViewContainer} key={i}>
              <img src={url} alt="" className={styles.imgView} />
              <div  className={styles.imgFrontFilm} >Imagen {i + 1}</div>
              <button
                 className={styles.oncloseBtn} value={url}
                onClick={(e) => handleOnClose(e)}
              >
                X
              </button>
            </div>
          );
        })}

        <label  className={images.length < 6 ? styles.cardFooter : styles.cardDooterDisabled} 
        >
          <div className={styles.divIcon}>
            <BiImageAdd size="2em" />
          </div>
          <input
            type="file"
             className={styles.imgUploader}
            onInput={(e) => handleUploadImage(e.target.files)}
            disabled={images.length < 6 ? false : true}
            multiple
            accept="image/png, image/jpeg"
          />
          Agregar imágenes de las zapatillas
        </label>
      </div>
      <progress
        value={progress}
        max="100"
         className= {progressVisible ? styles.progressBarActive : styles.progressBarInactive} 
      />
    </div>
  );
}

export default ImageUploader;