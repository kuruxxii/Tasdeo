import React from "react";
import homebg from "../images/homebg.jpg";

export default function About() {
  return (
    <div
      className="h-screen bg-cover flex flex-col justify-center"
      style={{ backgroundImage: `url(${homebg})` }}>
      <div className="flex flex-col items-center space-y-8">
        <h3 className="w-4/5 lg:w-1/2 text-base lg:text-lg text-white text-center lg:leading-loose">
          To Whom It May Concern:
        </h3>
        <p className="w-4/5 lg:w-3/5 text-base lg:text-lg text-white text-center lg:leading-loose">
          The name Tasdeo is derived from the Chinese idiom "教学相長" (Teachers
          and students develop each other).
        </p>
        <p className="w-4/5 lg:w-1/2 text-base lg:text-lg text-white text-center lg:leading-loose">
          The Tasdeo project is not intended to monitor students in a
          high-handed manner or to serve as a credit system that stigmatizes
          students' academic careers. It is designed to provide a reference
          other than standardized grades and to strengthen the connection and
          interaction between students and professors.
        </p>
        <p className="w-4/5 lg:w-1/2 text-base lg:text-lg text-white text-center lg:leading-loose">
          As a student for many years, I understand that academic performance is
          closely related to individual talent, physical and mental health, hard
          work, and even luck. It is not always the case that a good professor
          can teach good students, and academic performance is not the only
          factor that determines one's life path.
        </p>
        <p className="w-4/5 lg:w-1/2 text-base lg:text-lg text-white text-center lg:leading-loose">
          I would like to express my gratitude to my best friend XuanYi Wang for
          providing me with a lot of help in aesthetics and design methodology.
        </p>
        <p className="w-4/5 lg:w-1/2 text-base lg:text-lg text-white text-center lg:leading-loose">
          I wish you every success in your future endeavors.
        </p>
        <p className="w-4/5 lg:w-1/2 text-base lg:text-lg text-white text-center lg:leading-loose">
          Best,
        </p>
        <p className="w-4/5 lg:w-1/2 text-base lg:text-lg text-white text-center lg:leading-loose">
          Zihan Lin
        </p>
      </div>
    </div>
  );
}
