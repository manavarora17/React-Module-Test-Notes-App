import React, { useState, useEffect, useRef } from 'react';
import styles from './Modal.module.css';

const Modal = (props) => {
  const [formData, setFormData] = useState({ grpName: '', color: '' });
  const setGroups = props.setGroups;
  const groups = props.groups;
  const color = [
    '#B38BFA',
    '#FF79F2',
    '#43E6FC',
    '#F19576',
    '#0047FF',
    '#6691FF',
  ];
  const modalRef = useRef(null);

  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener('resize', updateScreenSize);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.closeModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [props]);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeColor = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.getAttribute('color'),
    });
  };

  const handleSubmit = () => {
    if (formData.color === '') {
      alert('Please select a color');
      return;
    }
    const newGroup = [
      ...groups,
      {
        groupName: formData.grpName,
        color: formData.color,
        notes: [],
        id: groups.length,
      },
    ];
    setGroups(newGroup);
    localStorage.setItem('groups', JSON.stringify(newGroup));
    props.closeModal(false);
  };

  return (
    <>
      {screenSize.width < 989 ? (
        <div className={styles.modalBackgroundMobile}>
          <div className={styles.modalContainerMobile} ref={modalRef}>
            <span>
              <button
                className={styles.closeButtonMobile}
                onClick={() => props.closeModal(false)}
              >
                X
              </button>
            </span>
            <h2 className={styles.modalHeading}>Create New Group</h2>
            <label className={styles.modalGrp}>Group Name</label>
            <input
              type="text"
              className={styles.modalTextMobile}
              name="grpName"
              placeholder="Enter your group name"
              onChange={handleChange}
            />
            <label className={styles.modalColor}>Choose Colour</label>
            {color.map((color, index) => (
              <button
                className={`${styles.colorButton} ${
                  formData.color === color ? 'selected' : ''
                }`}
                name="color"
                color={color}
                key={index}
                id={color}
                style={{
                  height: '40px',
                  width: '40px',
                  background: color,
                  borderRadius: '25px',
                  border: 'none',
                  marginRight: '10px',
                }}
                onClick={handleChangeColor}
              ></button>
            ))}
            <button
              className={styles.modalCreateMobile}
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.modalBackground}>
          <div className={styles.modalContainer} ref={modalRef}>
            <span>
              <button
                className={styles.closeButton}
                onClick={() => props.closeModal(false)}
              >
                X
              </button>
            </span>
            <h2 className={styles.modalHeading}>Create New Group</h2>
            <label className={styles.modalGrp}>Group Name</label>
            <input
              type="text"
              className={styles.modalText}
              name="grpName"
              placeholder="Enter your group name"
              onChange={handleChange}
            />
            <label className={styles.modalColor}>Choose Colour</label>
            {color.map((color, index) => (
              <button
                className={`${styles.colorButton} ${
                  formData.color === color ? 'selected' : ''
                }`}
                name="color"
                color={color}
                key={index}
                id={color}
                style={{
                  height: '40px',
                  width: '40px',
                  background: color,
                  borderRadius: '25px',
                  border: 'none',
                  marginRight: '10px',
                }}
                onClick={handleChangeColor}
              ></button>
            ))}
            <button className={styles.modalCreate} onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
