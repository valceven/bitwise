import React from 'react';
import BooleanAlgebraLesson from './IntroductionPart1';
import BooleanAlgebraLessonPart2 from './IntroductionPart2';
import BooleanAlgebraLessonPart1 from './IntroductionPart1';
import BooleanAlgebraLessonPart3 from './IntroductionPart3';
import BooleanAlgebraLessonPart4 from './IntroductionPart4';
import BooleanAlgebraInComputers from './BooleanAlgebraInComputers';
import BooleanExamples from './BooleanExamples';

 export const topic1Sections = [
    {
      title: "",
      content: (
        <BooleanAlgebraLessonPart1/>
      )
    },
    
    {
      title: "",
      content: (
        <BooleanAlgebraLessonPart2/>
      )
    },
    {
        title: "",
        content: (
          <BooleanAlgebraLessonPart3/>
        )
      }
      
      ,
      {
        title: "",
        content: (
          <BooleanAlgebraLessonPart4/>
        )
      }
      ,
      {
        title: "",
        content:<BooleanAlgebraInComputers/>
      }
      ,
      {
        title: "",
        content: (<BooleanExamples/>
        )
      }
  ];
