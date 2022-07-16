import React from "react";
import { Link } from "react-router-dom";
import styles from "./Gallery.module.css";
const Gallery = () => {
  return (
    <div className={styles.gallery}>
      <h1>Gallery</h1>
      <div className={styles.gallery_container}>
        <div className={styles.gallery_items_container}>
          <div className={styles.gallery_item_container}>
            <Link to="alumni-meet">
              <div className={styles.gallery_item}>
                <div className={styles.itemImg}>
                  <img src="https://source.unsplash.com/random/600x600" alt="gallery" />
                </div>
                <div className={styles.itemTitle}>
                  <h2>ALUMNI <span>MEET</span></h2>
                </div>
              </div>
            </Link>
          </div>
          <div className={styles.gallery_item_container}>
            <Link to="all-photos">
              <div className={styles.gallery_item}>
                <div className={styles.itemTitle}>
                  <h2><span>ALL</span> PHOTOS</h2>
                </div>

                <div className={styles.itemImg}>
                  <img src="https://source.unsplash.com/random/400x400" alt="gallery" />
                </div>
              </div>
            </Link>
          </div>
          <div className={styles.gallery_item_container}>
            <Link to="seminar-sessions">
              <div className={styles.gallery_item}>
                <div className={styles.itemTitle}>
                  <h2><span>SEMINAR</span> SESSIONS</h2>
                </div>

                <div className={styles.itemImg}>
                  <img src="https://source.unsplash.com/random/500x500" alt="gallery" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Gallery;
