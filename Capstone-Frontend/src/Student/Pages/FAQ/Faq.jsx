import React, { useState } from 'react';
import './faq.css';
import StudentSidebar from '../../Components/Sidebar';
import Logout from '../../Components/Logout';

const faqs = [
  {
    question: "What if I select courses that exceed the credit limit or clash with my schedule?",
    answer: "The system automatically checks credit caps (≤ 30 credits) and timetable clashes before submission."
  },
  {
    question: "Do I still need to get physical signatures from coordinators or HODs?",
    answer: "No. The portal offers a digital approval workflow that routes requests electronically to Coordinators, HODs, and DoAA."
  },
  {
    question: "Can I access the portal on mobile devices?",
    answer: "Yes, the portal is responsive and mobile-friendly. A dedicated mobile app/PWA is planned as a future enhancement."
  },
  {
    question: "Is there a way to get quick help inside the portal?",
    answer: "Yes. An AI-powered chatbot (coming soon) will answer common queries instantly. Until then, FAQs and help guides are available."
  },
  {
    question: "What documents do I need to upload with my application (e.g., fee receipt, approvals)?",
    answer: "Typically, you will need to upload the improvement course fee receipt and any special approvals (like IEP approval for final-year students). Required documents are listed during the application process."
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
      <div className="student-main-faq-top-row">
        <h1>FAQ & Help</h1>
        <Logout />
      </div>
      <div className="student-faq-content">
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
