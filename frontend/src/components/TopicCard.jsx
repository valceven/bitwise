import { useState } from "react";

export default function TopicCard({ topic }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!topic) {
    return <div className="text-red-500">No topic data available.</div>;
  }

  return (
    //<div className="w-full mx-auto mt-10 p-6 bg-white rounded-3xl shadow-[4px_4px_0px_#0b1e2d] border border-gray-200 ">
    <div className="w-full mx-auto mt-10 p-6 px-16">
      {/* Topic Header */}
      <div className="bg-white p-12 rounded-2xl">
        <h1 className="text-2xl font-bold">{topic.title}</h1>
        <p className="text-gray-600 mt-2 whitespace-pre-line text-justify">
          {topic.content}
        </p>
      </div>
    </div>
  );
}
