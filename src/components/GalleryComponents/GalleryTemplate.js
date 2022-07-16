import React, { useState } from 'react'
import styles from "./GalleryTemplate.module.css"

const imgSrc = "https://source.unsplash.com/random/"

// test data:
const dimension = ["300x300", "400x400", "500x500", "600x600", "700x700", "800x800", "900x900", "1000x1000"];
let images = [];
for (let i = 0; i < 10; i++) {
  let d = Math.floor(Math.random() * 8);
  let dm = dimension[d];
  let Src = imgSrc.concat(dm);
  images.push(Src);
}

function GalleryTemplate({ fname, sname, data }) {
  const [imageSwitch, setImageSwitch] = useState(
    {
      imageActive: 0,
      imageTop: null,
      imageBottom: 1,
    }
  )


  const handleScroll = event => {
    console.log('scrollTop: ', event.currentTarget.scrollTop);
    console.log('offsetHeight: ', event.currentTarget.scrollBottom);
  };

  const handleClick = (e) => {

    let id = parseInt(e.target.id);
    setImageSwitch({
      imageActive: id,
      imageTop: id - 1,
      imageBottom: id + 1,
    })
    console.log('id: ', id);
    console.log('imageSwitch: ', imageSwitch);
  }

  return (
    <div className={styles.gallery_container}>
      <div className={styles.header}>
        <h1>{fname} <span>{sname}</span></h1>
      </div>

      <div className={styles.gallery_content} onScroll={handleScroll}>
        {images.map((image, index) => {
          return (
            <img key={index} id={index} src={image} alt="" className={
              `${imageSwitch.imageActive === index && styles.image_active || imageSwitch.imageTop === index && styles.image_top || imageSwitch.imageBottom === index && styles.image_bottom}`
            }
              onClick={handleClick}
            />
          )
        })}

      </div>
    </div>
  )
}

export default GalleryTemplate