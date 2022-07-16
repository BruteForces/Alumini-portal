import React, { useState } from "react";
import styles from "./ForumCard.module.css";
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import CommentModal from "./CommentModal";
import PostModal from "./PostModal";

const ForumCard = ({ data, setProfileActive, profileActive }) => {
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  return (
    <div className={`${styles.post_container} `}>
      <CommentModal
        comments={data.comments}
        handleClose={() => {
          setIsCommentsModalOpen(false);
        }}
        isOpen={isCommentsModalOpen}
      />
      <PostModal
        isOpen={isPostModalOpen}
        handleClose={() => {
          setIsPostModalOpen(false);
        }}
        setProfileActive={setProfileActive}
      />
      <div className={`${styles.header} ${profileActive && styles.shadow}`}>
        <div className={styles.userinfo_container}>
          <img src={data.user.profile_image} onClick={setProfileActive} />
          <p className={styles.user_name}>{data.user.name}</p>
        </div>
        <div className={styles.post_action_container}>
          {false ? <AiFillHeart /> : <AiOutlineHeart />}
          <div
            onClick={() => {
              setIsCommentsModalOpen(true);
            }}
          >
            <BsChat />
          </div>
          <AiOutlineShareAlt />
        </div>
      </div>
      <div className={styles.post_image_container}>
        <img src={data.post.images[0]} className={`${profileActive && styles.shadow}`} />
        <div className={styles.post_overlay}></div>
        <div className={styles.post_caption_container}>
          <p>{data.post.caption.title}</p>
          <p>
            {data.post.caption?.description.slice(0, 500)}
            {"... "}
            <span
              onClick={() => {
                setIsPostModalOpen(true);
              }}
            >
              View More
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForumCard;
