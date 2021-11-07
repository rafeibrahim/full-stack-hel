import React from 'react';
import Header from './Header';
import Content from './Content';


const Course = (props) => {
    console.log("props course", props)
    return (
        <div>
            <Header />
            {props.courses.map((course) => {
                return <Content course={course} key={course.id} />
            })}
        </div>
    )
};

export default Course;