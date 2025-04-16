import { useState } from "react";


export default function LessonCard() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-3xl shadow-[4px_4px_0px_#0b1e2d] border border-gray-200 ">
        
      {/* Lesson Header */}
      <div>
        <h1 className="text-2xl font-bold">Lesson Name</h1>
        <p className="text-gray-600 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.
        </p>
      </div>

      {/* Laws of Boolean Algebra */}
      <div className="mt-6 border border-gray-300 rounded-md p-4 bg-gray-50">
        <h2 className="font-semibold mb-4">Laws of Boolean Algebra:</h2>
        <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-green-600">✔️</span>
              <span>Feature text goes here</span>
            </div>
          ))}
        </div>
      </div>

      {/* More Information */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold border-t pt-4 border-gray-300 mb-2">More information</h3>
        <div>
          <button
            className="flex items-center gap-2 text-sm font-medium text-left"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{isOpen ? "▴" : "▾"}</span>
            Details One
          </button>
          {isOpen && (
            <p className="mt-2 text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
