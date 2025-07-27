import React, { useState } from 'react';
import './faq.css';
import StudentSidebar from '../../Components/Sidebar';
import Logout from '../../Components/Logout';

const faqs = [
  {
    question: "What is the Improvement Portal?",
    answer: "The Improvement Portal is a platform for students to submit and track their improvement suggestions and ideas."
  },
  {
    question: "How do I submit an idea?",
    answer: "Navigate to the 'Submit Idea' section in the sidebar and fill out the form with your idea details."
  },
  {
    question: "Can I edit or delete my idea after submission?",
    answer: "Yes, go to the 'My Submissions' page to edit or delete your entries."
  },
  {
    question: "Who can view my submissions?",
    answer: "Your submissions are visible to authorized faculty and admin members for review."
  },
  {
    question: "What happens after I submit an idea?",
    answer: "Your idea will be reviewed by the concerned faculty or department. You’ll receive updates via the portal."
  }
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="student-faq-main">
      <StudentSidebar />
      {/* <Logout /> */}
      <div className="student-faq-content">
        <h1 className="student-faq-title">FAQ & Help</h1>
        <div className="student-faq-list">
          {faqs.map((item, index) => (
            <div
              key={index}
              className={`student-faq-item ${openIndex === index ? 'open' : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              <div className="student-faq-question">
                <span>{item.question}</span>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </div>
              {openIndex === index && (
                <div className="student-faq-answer">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
