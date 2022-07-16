import React, { useEffect } from "react";
import { IconContext } from "react-icons";
import { FaTimes } from "react-icons/fa";
import { a, config, useTransition } from "react-spring";
import ReactPortal from "components/Modal/ReactPortal";
import Styles from "./PostModal.module.css";

const PostModal = ({ handleClose, isOpen, setProfileActive }) => {
  const postModalTransitions = useTransition(isOpen, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
    config: config.wobbly,
  });

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  return postModalTransitions(
    (style, item) =>
      item && (
        <ReactPortal wrapperId="post_content_wrapper">
          <IconContext.Provider
            value={{
              color: "white",
              className: "react-icons",
            }}
          >
            <a.div style={style} className={Styles.post_modal_overlay}>
              <div className={Styles.post_modal_main}>
                <div className={Styles.post_header}>
                  <div className={Styles.user_info_container}>
                    <img
                      className={Styles.profile_image}
                      src={"https://picsum.photos/536/354"}
                      onClick={() => {
                        handleClose();
                        setProfileActive();
                      }}
                    />
                    <div className={Styles.user_info}>
                      <p className={Styles.username}>username</p>
                      <p className={Styles.user_designation}>Designation</p>
                    </div>
                  </div>
                  <FaTimes color="white" size="25px" onClick={handleClose} />
                </div>
                <p className={Styles.post_content}>
                  Lorem Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum. View MoreLorem Lorem Ipsum is simply
                  dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since
                  the 1500s, but also the leap into electronic typesetting,
                  remaining essentially unchanged. It was popularised in the
                  1960s with the release of Letraset sheets containing Lorem
                  like Aldus PageMaker including versions of Lorem Ipsum. View
                  Ipsum passages, and more recently with desktop publishing
                  software Ipsum passages, and more recently with desktop
                  publishing software Ipsum passages, and more recently with
                  desktop publishing software Ipsum passages, and more recently
                  with desktop publishing software Ipsum passages, and more
                  recently with desktop publishing software Ipsum passages, and
                  more recently with desktop publishing software Ipsum passages,
                  and more recently with desktop publishing software Ipsum
                  passages, and more recently with desktop publishing software
                  Ipsum passages, and more recently with desktop publishing
                  software Ipsum passages, and more recently with desktop
                  publishing software Ipsum passages, and more recently with
                  desktop publishing software Ipsum passages, and more recently
                  with desktop publishing software Ipsum passages, and more
                  recently with desktop publishing software Ipsum passages, and
                  more recently with desktop publishing software Ipsum passages,
                  and more recently with desktop publishing software Ipsum
                  passages, and more recently with desktop publishing software
                  Ipsum passages, and more recently with desktop publishing
                  software Ipsum passages, and more recently with desktop
                  publishing software Ipsum passages, and more recently with
                  desktop publishing software Ipsum passages, and more recently
                  with desktop publishing software Ipsum passages, and more
                  recently with desktop publishing software Ipsum passages, and
                  more recently with desktop publishing software Ipsum passages,
                  and more recently with desktop publishing software Ipsum
                  passages, and more recently with desktop publishing software
                  Ipsum passages, and more recently with desktop publishing
                  software Ipsum passages, and more recently with desktop
                  publishing software Ipsum passages, and more recently with
                  desktop publishing software MoreLorem Lorem Ipsum is simply
                  dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since
                  the 1500s, but also the leap into electronic typesetting,
                  remaining essentially unchanged. It was popularised in the
                  1960s with the release of Letraset sheets containing Lorem
                  Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem
                  Ipsum. View MoreLorem Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, but also
                  the leap into electronic typesetting, remaining essentially
                  unchanged. It was popularised in the 1960s with the release of
                  Letraset sheets containing Lorem Ipsum passages, and more
                  recently with desktop publishing software like Aldus PageMaker
                  including versions of Lorem Ipsum. View More
                </p>
              </div>
            </a.div>
          </IconContext.Provider>
        </ReactPortal>
      )
  );
};

export default PostModal;
