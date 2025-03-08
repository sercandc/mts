// CoursePage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import CreateCoursePage from "./CreateCoursePage";
import UpdateCoursePage from "./UpdateCoursePage";

const API_URL = "http://localhost:8080/api/";

function CoursePage() {
    const [courses, setCourses] = useState([]);
    const [editing, setEditing] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const getCourses = async () => {
        try {
            const response = await axios.get(API_URL + "courses");
            setCourses(response.data.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    const handleEditClick = (course) => {
        setSelectedCourse(course);
        setEditing(true);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                await axios.delete(`${API_URL}courses/${id}`);
                setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
            } catch (error) {
                console.error("Error deleting course:", error);
            }
        }
    };

    return (
        <>
            <h1>Course Dashboard</h1>

            {editing ? (
                <UpdateCoursePage
                    
                    course={selectedCourse}
                    setCourses={setCourses}
                    setEditing={setEditing}
                />
            ) : (
                <>
                    <ul>
                        {courses.map((course) => (
                            <li key={course.id}>
                                {course.id}, {course.code}, {course.title}
                                <button onClick={() => handleEditClick(course)}>Edit</button>
                                <button onClick={() => handleDeleteClick(course.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    <CreateCoursePage setCourses={setCourses} />
                </>
            )}
        </>
    );
}

export default CoursePage;
