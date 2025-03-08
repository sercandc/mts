package com.example.crs.controller;

import com.example.crs.model.Course;
import com.example.crs.model.CourseRepository;
import com.example.crs.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("/courses")
    public ResponseEntity<ApiResponse<List<Course>>> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return new ResponseEntity<>(new ApiResponse<>("Courses retrieved successfully", courses), HttpStatus.OK);
    }

    @GetMapping("/courses/{id}")
    public ResponseEntity<ApiResponse<Course>> getCourseById(@PathVariable("id") long id) {
        return courseRepository.findById(id)
                .map(course -> new ResponseEntity<>(new ApiResponse<>("Course found", course), HttpStatus.OK))
                .orElse(new ResponseEntity<>(new ApiResponse<>("Course not found", null), HttpStatus.NOT_FOUND));
    }

    @PostMapping("/courses")
    public ResponseEntity<ApiResponse<Course>> createCourse(@RequestBody Course course) {
        Course savedCourse = courseRepository.save(course);
        return new ResponseEntity<>(new ApiResponse<>("Course created successfully", savedCourse), HttpStatus.CREATED);
    }

    @PostMapping("/courses2")
    public ResponseEntity<ApiResponse<List<Course>>> createCourses(@RequestBody List<Course> courses) {
        List<Course> savedCourses = courseRepository.saveAll(courses);
        return new ResponseEntity<>(new ApiResponse<>("Courses created successfully", savedCourses), HttpStatus.CREATED);
    }

    @PutMapping("/courses/{id}")
    public ResponseEntity<ApiResponse<Course>> updateCourse(@PathVariable("id") long id, @RequestBody Course course) {
        return courseRepository.findById(id)
                .map(existingCourse -> {
                    existingCourse.setCode(course.getCode());
                    existingCourse.setTitle(course.getTitle());
                    Course updatedCourse = courseRepository.save(existingCourse);
                    return new ResponseEntity<>(new ApiResponse<>("Course updated successfully", updatedCourse), HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(new ApiResponse<>("Course not found", null), HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/courses/{id}")
    public ResponseEntity<ApiResponse<Long>> deleteCourse(@PathVariable("id") long id) {
        return courseRepository.findById(id)
                .map(course -> {
                    courseRepository.delete(course);
                    return new ResponseEntity<>(new ApiResponse<>("Course deleted successfully", id), HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(new ApiResponse<>("Course not found", null), HttpStatus.NOT_FOUND));
    }
}
