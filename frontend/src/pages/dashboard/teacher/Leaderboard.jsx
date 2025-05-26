import React, { useState, useEffect } from "react";
import { Trophy, Medal, Award, Crown, Star, TrendingUp } from "lucide-react";

const Leaderboard = ({ 
  students = [], 
  title = "Leaderboard", 
  showTopOnly = false, 
  maxDisplay = 10,
  className = "" 
}) => {
  const [sortedStudents, setSortedStudents] = useState([]);

  useEffect(() => {
    // Sort students by points in descending order
    const sorted = [...students].sort((a, b) => b.points - a.points);
    setSortedStudents(showTopOnly ? sorted.slice(0, 3) : sorted.slice(0, maxDisplay));
  }, [students, showTopOnly, maxDisplay]);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown size={20} className="text-yellow-500" />;
      case 2:
        return <Medal size={20} className="text-gray-400" />;
      case 3:
        return <Award size={20} className="text-amber-600" />;
      default:
        return <Star size={16} className="text-gray-300" />;
    }
  };

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200";
      case 2:
        return "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200";
      case 3:
        return "bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200";
      default:
        return "bg-white border-gray-200";
    }
  };

  const getPointsDisplay = (points) => {
    return points.toLocaleString();
  };

  if (sortedStudents.length === 0) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="flex items-center mb-4">
          <Trophy size={24} className="text-bluez mr-2" />
          <h3 className="text-xl font-bold text-grayz">{title}</h3>
        </div>
        <div className="text-center py-8">
          <TrendingUp size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No student data available for leaderboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      <div className="bg-gradient-to-r from-bluez to-darkpurple p-4">
        <div className="flex items-center">
          <Trophy size={24} className="text-white mr-2" />
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>

      {showTopOnly && sortedStudents.length >= 3 ? (
        // Podium view for top 3
        <div className="p-6">
          <div className="flex justify-center items-end space-x-4 mb-6">
            {/* 2nd place */}
            {sortedStudents[1] && (
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img 
                    src={sortedStudents[1].profileImg || "/api/placeholder/60/60"} 
                    alt={sortedStudents[1].name}
                    className="w-16 h-16 rounded-full border-4 border-gray-300"
                  />
                  <div className="absolute -top-2 -right-2 bg-gray-400 rounded-full p-1">
                    <Medal size={16} className="text-white" />
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 mt-2 text-center min-w-[120px]">
                  <div className="font-semibold text-grayz text-sm">{sortedStudents[1].name}</div>
                  <div className="text-xs text-gray-600">{getPointsDisplay(sortedStudents[1].points)} pts</div>
                </div>
                <div className="w-20 h-16 bg-gray-300 rounded-t-lg flex items-center justify-center mt-2">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
              </div>
            )}

            {/* 1st place */}
            {sortedStudents[0] && (
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img 
                    src={sortedStudents[0].profileImg || "/api/placeholder/60/60"} 
                    alt={sortedStudents[0].name}
                    className="w-20 h-20 rounded-full border-4 border-yellow-400"
                  />
                  <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1">
                    <Crown size={18} className="text-white" />
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-2 text-center min-w-[120px]">
                  <div className="font-bold text-grayz">{sortedStudents[0].name}</div>
                  <div className="text-sm text-yellow-700">{getPointsDisplay(sortedStudents[0].points)} pts</div>
                </div>
                <div className="w-20 h-20 bg-yellow-500 rounded-t-lg flex items-center justify-center mt-2">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
              </div>
            )}

            {/* 3rd place */}
            {sortedStudents[2] && (
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img 
                    src={sortedStudents[2].profileImg || "/api/placeholder/60/60"} 
                    alt={sortedStudents[2].name}
                    className="w-16 h-16 rounded-full border-4 border-amber-400"
                  />
                  <div className="absolute -top-2 -right-2 bg-amber-600 rounded-full p-1">
                    <Award size={16} className="text-white" />
                  </div>
                </div>
                <div className="bg-amber-50 rounded-lg p-3 mt-2 text-center min-w-[120px]">
                  <div className="font-semibold text-grayz text-sm">{sortedStudents[2].name}</div>
                  <div className="text-xs text-amber-700">{getPointsDisplay(sortedStudents[2].points)} pts</div>
                </div>
                <div className="w-20 h-12 bg-amber-600 rounded-t-lg flex items-center justify-center mt-2">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // List view for all students
        <div className="p-4">
          <div className="space-y-2">
            {sortedStudents.map((student, index) => {
              const rank = index + 1;
              return (
                <div 
                  key={student.id} 
                  className={`flex items-center p-3 rounded-lg border transition-all hover:shadow-md ${getRankStyle(rank)}`}
                >
                  <div className="flex items-center justify-center w-8 h-8 mr-3">
                    {rank <= 3 ? (
                      getRankIcon(rank)
                    ) : (
                      <span className="text-sm font-bold text-gray-500">#{rank}</span>
                    )}
                  </div>
                  
                  <div className="flex-shrink-0 mr-3">
                    <img 
                      src={student.profileImg || "/api/placeholder/40/40"} 
                      alt={student.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="font-semibold text-grayz">{student.name}</div>
                    {student.completed && (
                      <div className="text-xs text-green-600 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                        Completed
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-lg text-grayz">{getPointsDisplay(student.points)}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;