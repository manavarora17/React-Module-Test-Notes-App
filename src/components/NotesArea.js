import React, { useState, useEffect } from 'react';
import sendIcon from '../assets/send.png';
import back from '../assets/back.png';
import styles from './NotesArea.module.css';

const NotesArea = (props) => {
  const [note, setNote] = useState('');

  let groupSelect = props.groupSelect;
  let notes = groupSelect.notes;
  let groups = props.groups;
  let setGroups = props.setGroups;

  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener('resize', Screen);
  }, []);

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = () => {
    let newGroup = [...groups];

    let Cgroup = newGroup[groupSelect.id];

    let time = `${new Date().toLocaleTimeString('en-us', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })}`;

    let date = `${new Date().toLocaleDateString([], {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}`;

    Cgroup['notes'].push({ date, time, note });
    localStorage.setItem('groups', JSON.stringify(newGroup));
    setGroups(newGroup);
  };

  const keypress = (e) => {
    if (e.code === 'Enter') {
      handleSubmit();
      setNote('');
    }
  };

  return (
    <>
      {screenSize.width < 989 ? (
        <div className={styles.notesContainer}>
          <div className={styles.notesHeader}>
            <img
              src={back}
              alt="back"
              onClick={() => {
                window.location.reload();
              }}
            />
            <div
              className={styles.notesGroup}
              style={{ background: groupSelect.color }}
            >
              {groupSelect.groupName?.slice(0, 2)?.toUpperCase()}
            </div>
            <h2 className={styles.groupName}>{groupSelect.groupName}</h2>
          </div>
          <div className={styles.NotesAndDateMobile}>
            {notes.map((note, index) => (
              <div key={index} className={styles.NoteCard}>
                <div className={styles.DateAndText}>
                  <p className={styles.TextMobile}>{note.note}</p>
                  {/* Date and Time Container */}
                  <div className={styles.DateAndTimeMobile}>
                    <p className={styles.DateMobile}>{note.date}</p>
                    <span className={styles.SeparatorMobile}>•</span>
                    <p className={styles.TimeMobile}>{note.time}</p>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.TextareaMobile}>
            <textarea
              className={styles.TextInputMobile}
              type="text"
              value={note}
              onChange={handleChange}
              placeholder="Enter your text here..."
              onKeyDown={keypress}
            ></textarea>
            <img
              src={sendIcon}
              className={styles.SendImgMobile}
              alt="SendImg"
              onClick={handleSubmit}
            />
          </div>
        </div>
      ) : (
        <div className={styles.notesContainer}>
          <div className={styles.notesHeader}>
            <div
              className={styles.notesGroup}
              style={{ background: groupSelect.color }}
            >
              {groupSelect.groupName?.slice(0, 2)?.toUpperCase()}
            </div>
            <h2 className={styles.groupName}>{groupSelect.groupName}</h2>
          </div>
          <div className={styles.NotesAndDate}>
            {notes.map((note, index) => (
              <div key={index} className={styles.NoteCard}>
                <div className={styles.DateAndText}>
                  <p className={styles.Text}>{note.note}</p>
                  {/* Date and Time Container */}
                  <div className={styles.DateAndTimeContainer}>
                    <p className={styles.Date}>{note.date}</p>
                    <span className={styles.Separator}>•</span>
                    <p className={styles.Time}>{note.time}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.Textarea}>
            <textarea
              className={styles.TextInput}
              type="text"
              value={note}
              onChange={handleChange}
              placeholder="Enter your text here..."
              onKeyDown={keypress}
            ></textarea>
            <img
              src={sendIcon}
              className={styles.SendImg}
              alt="SendImg"
              onClick={handleSubmit}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NotesArea;
