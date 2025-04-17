import React from 'react';
import { Line } from 'rc-progress';
import Star from '../../assets/Star.svg';
import LessonCard from '../../components/TopicCard';
import Button from '../../components/buttons/PurpleButton';

const TopicView = () => {
    // const { lessonid } = useParams();

    return (
        <div className='flex-col justify-center items-center h-full pb-16'>
       
            <div className='p-4'>
                <Line percent={5} strokeWidth={1} strokeColor="#27ae60" />
            </div>
            <div className='flex flex-col justify-center items-center space-y-4'>
                {/* <LessonCard lessonid={lessonid}></LessonCard> */}
                <LessonCard></LessonCard>

                <Button className='bg-bluez btn-shadow items-end'>Next</Button>
            </div>
            
        
        
        </div>
    );
};

export default TopicView;