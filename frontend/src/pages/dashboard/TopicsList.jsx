import { ArrowLeft } from "lucide-react";

const TopicsList = ({ topics, lessonId, onBack, onSelectTopic }) => (
  <div>
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-gray-800">
         Topics for <span className="capitalize">{lessonId}</span>
      </h2>
      <button
        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition text-sm"
        onClick={onBack}
      >
        <ArrowLeft size={16} />
        Back to Lessons
      </button>
    </div>

    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {topics.map((topic) => (
        <li key={topic.id}>
          <button
            onClick={() => onSelectTopic(topic.id)}
            className="w-full p-4 rounded-xl shadow-sm border border-gray-200 bg-white hover:bg-blue-50 transition text-left"
          >
            <span className="font-medium text-gray-700">{topic.name}</span>
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default TopicsList;
