
import React, { useEffect, useState } from 'react';
import ReactPortal from "components/Modal/ReactPortal";
import { IoClose } from "react-icons/io5";
import { BiImageAdd } from "react-icons/bi";
import styles from "./NewPostModal.module.css";
import { GiPin } from "react-icons/gi";


function NewPostModal({ data, setNewPostActive }) {
  const [imageSwitch, setImageSwitch] = useState(false);
  const [postData, setPostData] = useState({
    cname: '',
    designation: '',
    title: "",
    description: "",
    image: "",
  });
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setPostData({
        ...postData,
        image: postData.image || undefined
      });
      return;
    }
    setPostData({
      ...postData,
      image: e.target.files[0]
    });

  };
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? setNewPostActive(false) : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    }
  }, [setNewPostActive]);

  const handleMouseEnter = () => {
    setImageSwitch(true)
  }

  const handleMouseLeave = () => {
    setImageSwitch(false)
  }
  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('postData', postData);
  }




  return (
    <ReactPortal wrapperId="new_post_modal_wrapper">
      <div className={styles.new_post_overlay}>
        <div className={styles.new_post_container}>
          <div className={styles.header}>
            <div className={styles.userinfo_container}>
              <img src={data.user.profile_image} />
              <p className={styles.user_name}>{data.user.name}</p>
            </div>
            <IoClose
              size="30px"
              className={styles.close_icon}
              onClick={() => setNewPostActive(false)}
            />
          </div>
          <div className={styles.body}>
            <form onSubmit={handleSubmit}>
              <div className={styles.input_container}>
                <input name="cname" type="text" id="cname" placeholder="Company Name" value={postData.cname} onChange={handleChange} />
              </div>
              <div className={styles.input_container}>
                <input type="text" name="designation" id="designation" placeholder="Designation" value={postData.designation} onChange={handleChange} />
              </div>
              <div className={styles.description_container}>
                <div className={styles.input_container}>
                  <input type="text" name="title" id="title" placeholder="title" value={postData.title} onChange={handleChange} />
                </div>
                <div className={styles.input_container}>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    placeholder="description"
                    value={postData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.img_input_container}>

                {postData.image && imageSwitch && (
                  <label for="img-switch" >
                    <img src={require('assets/image-switch.png')} alt="image-switch-icon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                  </label>
                )
                }
                <input name="image" id="img-switch" type="file" onChange={onSelectFile} />

                {postData.image ? (
                  <img className={`${imageSwitch && styles.image_blur}`} src={URL.createObjectURL(postData.image)} alt="upload-image" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                ) : (

                  <div className={styles.img_input}>
                    <label for="img-input">
                      <BiImageAdd size="50px" />
                      <p>Add Image</p>
                    </label>
                    <input name="image" id="img-input" type="file" onChange={onSelectFile} />
                  </div>
                )}
              </div>
              <button className={styles.post_btn} type="submit" >
                <div className={styles.post_name}>
                  Post
                </div>
                <div className={styles.post_icon}>
                  <GiPin />
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
}

export default NewPostModal;
