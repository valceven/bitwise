import React, { useState,useEffect } from 'react';
import { Line } from 'rc-progress';
import TopicCard from '../../components/TopicCard';
import Button from '../../components/buttons/PurpleButton';
import { useParams } from 'react-router-dom';
import { topic1Sections, topic2Sections } from '../../components/sections/Lesson1TopicSections';

const TopicView = () => {
    const [isOneOpen, setIsOneOpen] = useState(false);
    const [isTwoOpen, setIsTwoOpen] = useState(false);
    const { topicId } = useParams();


    //need to check for lesson as well
    const topics = [{
        id: "1", //will be changed depending on the topicID from the back end
        topicSections: topic1Sections
    },
    {
        id: "2",
        topicSections: topic2Sections
    }];

  

    const matchedTopic = topics.find(u => u.id === topicId);

    const topicSections = matchedTopic?.topicSections || [];     
    

      const [currentIndex, setCurrentIndex] = useState(() => {
        const storedIndex = localStorage.getItem('topicIndex');
        return storedIndex ? parseInt(storedIndex) : 0;
    });

    useEffect(() => {
       

        localStorage.setItem('topicIndex', currentIndex);
    }, [currentIndex]);
    
    

    const handleNext = () => {
        if (currentIndex < topicSections.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const progress = ((currentIndex + 1) / topicSections.length) * 100;

    return (
        <div className='flex-col justify-center items-center h-full w-3/4 pb-16'>
            <div className='p-4'>
                <Line percent={progress} strokeWidth={1} strokeColor="#27ae60" />
            </div>
            <div className='flex flex-col justify-center items-end space-y-4 w-full'>
                <TopicCard topic={topicSections[currentIndex]} />
                <div className="flex justify-end items-end mt-4 gap-4">
                    {currentIndex > 0 && (
                        <Button
                            className='bg-bluez btn-shadow items-end'
                            onClick={handlePrevious}
                            disabled={currentIndex <= 0}
                        >
                            Previous
                        </Button>
                    )}
                 

                    <Button
                        className='bg-bluez btn-shadow items-end'
                        onClick={handleNext}
                        disabled={currentIndex >= topicSections.length - 1}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TopicView;
