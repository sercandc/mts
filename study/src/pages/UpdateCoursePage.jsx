// UpdateCoursePage.jsx
import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/";

function UpdateCoursePage({ course, setCourses, setEditing }) {
    const [courseCode, setCourseCode] = useState(course.code);
    const [courseTitle, setCourseTitle] = useState(course.title);

    const updateCourse = async () => {
        const updatedCourse = { code: courseCode, title: courseTitle };
        try {
            const response = await axios.put(`${API_URL}courses/${course.id}`, updatedCourse);
            setCourses((prevCourses) =>
                prevCourses.map((c) => (c.id === course.id ? response.data.data : c))
            );
            setEditing(false);
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    return (
        <div>
            <h2>Update Course</h2>
            <input type="text" disabled value={course.id}></input>
            <input
                type="text"
                placeholder="Course Code"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
            />
            <input
                type="text"
                placeholder="Course Title"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
            />
            <button onClick={updateCourse}>Update</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
    );
}

export default UpdateCoursePage;
