// // CreateCoursePage.jsx
// import { useState } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:8080/api/";

// function CreateCoursePage({ setCourses }) {
//     const [courseCode, setCourseCode] = useState("");
//     const [courseTitle, setCourseTitle] = useState("");

//     const createCourse = async () => {
//         const course = { code: courseCode, title: courseTitle };
//         try {
//             const response = await axios.post(`${API_URL}courses`, course);
//             setCourses((prevCourses) => [...prevCourses, response.data.data[0]]);
//             setCourseCode("");
//             setCourseTitle("");
//         } catch (error) {
//             console.error("Error creating course:", error);
//         }
//     };

//     return (
//         <div>
//             <h2>Create Course</h2>
//             <input
//                 type="text"
//                 placeholder="Course Code"
//                 value={courseCode}
//                 onChange={(e) => setCourseCode(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Course Title"
//                 value={courseTitle}
//                 onChange={(e) => setCourseTitle(e.target.value)}
//             />
//             <button onClick={createCourse}>Submit</button>
//         </div>
//     );
// }

// export default CreateCoursePage;

import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/";

function CreateCoursePage({ setCourses }) {
    const [courseCode, setCourseCode] = useState("");
    const [courseTitle, setCourseTitle] = useState("");

    const createCourse = () => {
        if (!courseCode || !courseTitle) {
            alert("Course code and title are required!");
            return;
        }

        const course = {
            code: courseCode,
            title: courseTitle
        };

        axios.post(API_URL + "courses", course) // Send as an array
            .then(response => {
                console.log("Course created:", response.data);
                setCourses((courses) => [...courses, response.data.data]);
                setCourseCode("");
                setCourseTitle("");
            })
            .catch(error => {
                console.error("Error creating course:", error);
            });
    };

    return (
        <div>
            <h1>Create Course</h1>
            <input
                type="text"
                value={courseCode}
                placeholder="Course Code"
                onChange={(e) => setCourseCode(e.target.value)}
            />
            <input
                type="text"
                value={courseTitle}
                placeholder="Course Title"
                onChange={(e) => setCourseTitle(e.target.value)}
            />
            <button onClick={createCourse}>Submit</button>
        </div>
    );
}

export default CreateCoursePage;
