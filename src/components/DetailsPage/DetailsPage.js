import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { creatures } from "../../data/creatures";
import "./DetailsPage.css";
import SideNav from "../SideNav/SideNav";

const DetailsPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const creature = creatures.find((c) => c.id === parseInt(id));

  const [currentSection, setCurrentSection] = useState(0);
  const [currentSubSection, setCurrentSubSection] = useState(null);
  const sectionsRef = useRef([]);

  const handleSectionSelect = (section, subSection = null) => {
    setCurrentSection(section); // 更新当前选中的 Section
    setCurrentSubSection(subSection); // 更新当前选中的 subSection
    scrollToSection(section, subSection);
  };

  // 每个section的内容
  const sections = [
    { title: 'Section 1', content: 'Content of Section 1' },
    { title: 'Section 2', content: 'Content of Section 2' },
    { 
      title: 'Section 3', 
      content: 'Content of Section 3', 
      subSections: [
        { title: 'Section 3A', content: 'Content of Section 3A' },
      ] 
    },
    { title: 'Section 4', content: 'Content of Section 4' }
  ];

  // 滚动跳转到对应的 section & subsection
  const scrollToSection = (index, subIndex = null) => {
    if (sectionsRef.current[index]) {
      sectionsRef.current[index].scrollIntoView({
        behavior: 'smooth',
      });
      setCurrentSection(index);
      setCurrentSubSection(subIndex);
    }
  };

  // 监听滚动事件
  const handleScroll = (event) => {
    if (event.deltaY > 0) {
      // 鼠标向下滚动
      if (currentSection === 2) {
        // 在 Section-3 时，判断是否滚动到 Section-3A
        if (currentSubSection === null) {
          scrollToSection(2, 0);  
        } else if (currentSubSection === 0) {
          scrollToSection(3);  
        }
      } else if (currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1); // 跳转到下一个 Section
      }
    } else {
      // 鼠标向上滚动
      if (currentSection === 2 && currentSubSection === 0) {
        scrollToSection(2, null); // 在 Section-3A 时，跳转到 Section-3  
      } else if (currentSection === 3) {
        scrollToSection(2, 0); // 在 Section-4 时，跳转到 Section-3A  
      } else if (currentSection > 0) {
        scrollToSection(currentSection - 1);  // 跳转到上一个 Section
      }
    }
  };


  return (
    <div className="details-page" onWheel={handleScroll}>
      <div className="back-button" onClick={() => navigate("/")}>
        <img src="/detailspage/back-button.png" alt="Back" />
      </div>
      <SideNav currentSection={currentSection} onSectionSelect={handleSectionSelect} />
      <div className="content">
        {sections.map((section, index) => (
          <div
            key={index}
            ref={(el) => (sectionsRef.current[index] = el)}
            className={`section ${currentSection === index ? 'active' : ''}`}
          >
            <h2>{section.title}</h2>
            <p>{section.content}</p>

            {/* 处理嵌套的子section */}
            {section.subSections && currentSection === 2 && currentSubSection !== null && (
              <div className="subsection">
                <h3>{section.subSections[currentSubSection].title}</h3>
                <p>{section.subSections[currentSubSection].content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsPage;