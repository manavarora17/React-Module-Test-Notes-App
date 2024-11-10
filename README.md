# Notes App

A React-based application that allows users to manage their notes efficiently. Users can create groups for notes, add and manage their notes with ease, and ensure their data persists even after page reload using local storage.

## Features

1. **Create Groups for Notes**:

   - Users can create groups to organize their notes.
   - A modal popup is used for creating a new group.
   - The modal closes automatically if the user clicks outside of it.

2. **Add Notes to Groups**:

   - Users can add new notes to a selected group.
   - Notes can be saved either by pressing the Enter key or by clicking on the Enter icon.

3. **Persistent Notes and Groups**:

   - Notes and groups are saved in `localStorage`, ensuring they persist even after the page reloads.
   - Every note and group is loaded from `localStorage` when the application starts.

4. **Dynamic Notes Loading**:

   - When the user changes the group, the application fetches and displays all the notes related to the selected group.

5. **Metadata Management**:
   - Each note records the date and time of when it was created and last updated.

## Technologies Used

- **React**: Used for building the user interface.
- **Local Storage**: For persisting notes and groups data.
- **CSS Modules**: For styling components.
