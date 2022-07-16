import React, { useState } from "react";
import ForumCard from "components/ForumComponents/ForumCard";
import NewPostModal from "components/ForumComponents/NewPostModal";
import ProfileModal from "components/ForumComponents/ProfileModal";
import Styles from "./AlumniForum.module.css";
import { AiOutlinePlus } from "react-icons/ai";
const DUMMY_POST_DATA = [
  {
    id: 1,
    user: {
      name: "Ben Tennyson",
      profile_image: require("assets/ben.png"),
    },
    post: {
      images: ["https://picsum.photos/536/354"],
      caption: {
        title: "Tile - Testing Postcard",
        description:
          "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    },
    comments: [
      {
        user: {
          name: "Ben Tennyson",
          profile_image: "https://picsum.photos/536/354",
        },
        comment:
          "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        replies: [
          {
            username: "Ben",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
        ],
      },
      {
        user: {
          name: "Enrico",
          profile_image: require("assets/ben.png"),
        },
        comment:
          "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        replies: [
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Hello",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Hello",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Hello",
          },
        ],
      },
      {
        user: {
          name: "Enrico",
          profile_image: require("assets/ben.png"),
        },
        comment:
          "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        replies: [
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Hello",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Hello",
          },
          {
            username: "Zahra",
            user_profile_picture: "https://picsum.photos/536/354",
            text: "Hello",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    user: {
      name: "Ben Tennyson",
      profile_image: require("assets/ben.png"),
    },
    post: {
      images: [
        "https://i.picsum.photos/id/676/536/354.jpg?hmac=AUe7ybcPXLBm37YhZd49jpbOql4HORAAWX-WUPSOhjg",
      ],
      caption: {
        title: "Tile - Testing Postcard",
        description:
          "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    },
    comments: [
      {
        user: {
          name: "name",
          profile_image: require("assets/ben.png"),
        },
        comment: "Hello Ben",
        replies: [{ user_name: "Mr. Sudalai", text: "Hello" }],
      },
      {
        user: {
          name: "name",
          profile_image: require("assets/ben.png"),
        },
        comment: "Hi Ben",
        replies: ["Hello"],
      },
    ],
  },
];

function AlumniForum() {
  const [newPostActive, setNewPostActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);
  return (
    <div className={Styles.container}>
      <div className={Styles.forum_container}>
        {DUMMY_POST_DATA.map((post) => (
          <ForumCard key={post.id} data={post} setProfileActive={() => setProfileActive(true)} />
        ))}
      </div>
      <div className={Styles.new_post_button} onClick={() => setNewPostActive(true)}>
        <div className={Styles.new_post_name}>
          New Post
        </div>
        <div className={Styles.new_post_icon}>
          <AiOutlinePlus />
        </div>
      </div>
      {newPostActive && (
        <NewPostModal data={DUMMY_POST_DATA[0]} setNewPostActive={setNewPostActive} />
      )}
      {profileActive && <ProfileModal handleClose={() => setProfileActive(false)} />}


    </div>
  );
}

export default AlumniForum;
