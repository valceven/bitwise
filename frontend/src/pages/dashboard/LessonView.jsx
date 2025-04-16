import React from 'react';
import { Line } from 'rc-progress';
import Star from '../../assets/Star.svg';
import LessonCard from '../../components/LessonCard';

const LessonView = () => {
    return (
        <div className='h-full pb-16'>
       
            <div className='p-4'>
                <Line percent={5} strokeWidth={1} strokeColor="#27ae60" />
            </div>
            
            <LessonCard></LessonCard>

        
        
        </div>
    );
};

export default LessonView;