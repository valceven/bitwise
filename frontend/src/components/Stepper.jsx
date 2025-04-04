export default function Stepper({ step }) {
    return (
        <div className="flex items-center justify-center w-full">
            <ol className="flex items-center justify-center w-3/4 m-10 ml-30">
                {/* Step 1 */}
                <li
                    className={`flex w-full items-center ${
                        step >= 2
                            ? "text-purple-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-purple-500 after:inline-block"
                            : "text-gray-400 after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-300 after:inline-block"
                    }`}
                >
                    <span
                        className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${
                            step >= 1
                                ? "bg-purple-500 btn-shadow text-white"
                                : "bg-gray-200 text-gray-500"
                        }`}
                    >
                        1
                    </span>
                </li>

                {/* Step 2 */}
                <li
                    className={`flex w-full items-center ${
                        step >= 3
                            ? "text-purple-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-purple-500 after:inline-block"
                            : "text-gray-400 after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-300 after:inline-block"
                    }`}
                >
                    <span
                        className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${
                            step >= 2
                                ? "bg-purple-500 btn-shadow text-white"
                                : "bg-gray-200 text-gray-500"
                        }`}
                    >
                        2
                    </span>
                </li>

                {/* Step 3 */}
                <li
                    className={`flex w-full items-center  ${
                        step >= 4
                            ? "text-purple-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-purple-500 after:inline-block"
                            : "text-gray-400 after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-300 after:inline-block"
                    }`}
                >
                    <span
                        className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${
                            step >= 3
                                ? "bg-purple-500 btn-shadow text-white"
                                : "bg-gray-200 text-gray-500"
                        }`}
                    >
                        3
                    </span>
                </li>

                {/* Step 4 */}
                <li className="flex items-center w-full ">
                    <span
                        className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${
                            step >= 4
                                ? "bg-purple-500 btn-shadow text-white"
                                : "bg-gray-200 text-gray-500"
                        }`}
                    >
                        4
                    </span>
                </li>
            </ol>
        </div>
        
    );
}