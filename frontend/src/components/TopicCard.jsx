import { useState } from "react";

export default function TopicCard({ topic }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full mx-auto mt-10 p-6 bg-white rounded-3xl shadow-[4px_4px_0px_#0b1e2d] border border-gray-200 ">
      {/* Topic Header */}
      <div>
        <h1 className="text-2xl font-bold">{topic.title}</h1>
        <p className="text-gray-600 mt-2 whitespace-pre-line">{topic.content}</p>
      </div>
    </div>
  );
}
