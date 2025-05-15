import React, { useState,useEffect } from 'react';
import { Line } from 'rc-progress';
import TopicCard from '../../components/TopicCard';
import Button from '../../components/buttons/PurpleButton';
import { useParams, useNavigate } from 'react-router-dom';
import { topic1Sections } from '../../components/sections/topic1/Topic1Sections';
import { topic2Sections } from '../../components/sections/topic2/Topic2Sections';

const TopicView = () => {
   
    const { topicId } = useParams();
    const navigate = useNavigate();



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
    
    const [isCompleted, setIsCompleted] = useState(() => {
    const storedStatus = localStorage.getItem(`topicStatus-${topicId}`);
    return storedStatus === 'complete';
    });


    
    const [currentIndex, setCurrentIndex] = useState(() => {
    const storedIndex = localStorage.getItem(`topicIndex-${topicId}`);
    return storedIndex ? parseInt(storedIndex) : 0;
    });

    useEffect(() => {
        localStorage.setItem(`topicIndex-${topicId}`, currentIndex);
    }, [currentIndex, topicId]);



    
    

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

    const handleFinish = () => { // handle in backend to set status to complete
        localStorage.setItem(`topicStatus-${topicId}`, 'complete');
        setIsCompleted(true);
        
        // Redirect to lesson view and send status via state
        navigate('/app/lessonview', {
            state: { topicId, status: 'complete' }
        });
    };


    const progress = ((currentIndex + 1) / topicSections.length) * 100;

    return (
        <div className='flex-col justify-center items-center h-full w-3/4 pb-16'>
            <div className='p-4'>
                <Line percent={progress} strokeWidth={1} strokeColor="#27ae60" />
            </div>
            <div className='flex flex-col justify-center items-end space-y-4 w-full'>
                <TopicCard topic={topicSections[currentIndex]} />
                <div className="flex justify-end items-end">
                    {currentIndex > 0 && (
                        <Button
                            className='fixed bg-bluez btn-shadow items-end bottom-10 mr-22'
                            onClick={handlePrevious}
                            disabled={currentIndex <= 0}
                        >
                            Previous
                        </Button>
                    )}

                    {currentIndex >= topicSections.length - 1 ? (
                        <Button
                            className='fixed bg-green-600 btn-shadow items-end bottom-10'
                            onClick={handleFinish}
                        >
                            Finish
                        </Button>
                    ) : (
                        <Button
                            className='fixed bg-bluez btn-shadow items-end bottom-10'
                            onClick={handleNext}
                            disabled={currentIndex >= topicSections.length - 1}
                        >
                            Next
                        </Button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default TopicView;
