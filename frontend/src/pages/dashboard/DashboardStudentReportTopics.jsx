import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import TopicsList from "./TopicsList";
import StudentList from "./StudentList";

const topicsData = {
  lesson1: [
    { id: "t1", name: "Topic 1-1" },
    { id: "t2", name: "Topic 1-2" },
  ],
  lesson2: [{ id: "t3", name: "Topic 2-1" }],
};

const studentsData = {
  t1: [
    { id: 1, name: "Alice", points: 4000, profileImg: "https://i.pravatar.cc/50?img=1", completed: true},
    { id: 2, name: "Bob", points: 2400, profileImg: "https://i.pravatar.cc/50?img=2", completed: false },
  ],
  t2: [{ id: 3, name: "Charlie", points: 1680, profileImg: "https://i.pravatar.cc/50?img=3", completed: false }],
  t3: [{ id: 4, name: "Dave", points: 1320, profileImg: "https://i.pravatar.cc/50?img=4", completed: true}],
};

const DashboardStudentReportTopics = ({ lessonId, onBack }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  console.log(lessonId)

  return (
    <div className="space-y-6">
      {!selectedTopic ? (
        <TopicsList
          topics={topicsData[lessonId] || []}
          lessonId={lessonId}
          onBack={onBack}
          onSelectTopic={setSelectedTopic}
        />
      ) : (
        <StudentList
          topicId={selectedTopic}
          students={studentsData[selectedTopic]}
          onBack={() => setSelectedTopic(null)}
        />
      )}
    </div>
  );
};

export default DashboardStudentReportTopics;
