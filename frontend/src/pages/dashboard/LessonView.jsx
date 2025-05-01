import { Button } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // important!!

const LessonView = () => {
  const logicGatesLesson = {
    title: "Logic Gates 101",
    content: `
# Introduction to Logic Gates

Logic gates are the basic building blocks of digital circuits.  
They perform basic logical functions that are essential for digital computing.

---

## Common Logic Gates

### 1. AND Gate
- The output is \`1\` only if **both inputs** are \`1\`.
- Otherwise, the output is \`0\`.

| Input A | Input B | Output |
| :-----: | :-----: | :----: |
| 0       | 0       | 0      |
| 0       | 1       | 0      |
| 1       | 0       | 0      |
| 1       | 1       | 1      |


---

### 2. OR Gate
- The output is \`1\` if **at least one input** is \`1\`.
- Otherwise, the output is \`0\` if both inputs are \`0\`.

| Input A | Input B | Output |
| :-----: | :-----: | :----: |
| 0       | 0       | 0      |
| 0       | 1       | 1      |
| 1       | 0       | 1      |
| 1       | 1       | 1      |

---

### 3. NOT Gate
- Also called an **Inverter**.
- It **reverses** the input:
  - If input is \`1\`, output is \`0\`
  - If input is \`0\`, output is \`1\`

| Input | Output |
| :---: | :----: |
| 0     | 1      |
| 1     | 0      |


---

## Summary

| Gate | Function |
| :--: | :------: |
| AND  | Output \`1\` if both inputs are \`1\` |
| OR   | Output \`1\` if at least one input is \`1\` |
| NOT  | Inverts the input |  

---

## Fun Fact!

Logic gates are usually built using **transistors**.  
These tiny switches control the flow of electricity in computers and are part of why modern computers are so powerful!
    `,
  };

  return (
    <div className="flex flex-col items-center justify-center h-full pb-16 px-6 w-full">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 addinter">
          {logicGatesLesson.title}
        </h1>
        <div className="prose prose-lg max-w-none addinter text-lg font-medium text-gray-500">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {logicGatesLesson.content}
          </ReactMarkdown>
        </div>
      </div>
      <div className="flex justify-end mt-20 w-full max-w-3xl">
      <button
        className="bg-gray-500 hover:bg-gray-600 btn-shadow addgrotesk p-3 px-4 mr-auto"
      >
        Previous
      </button>
      <button
        className="bg-bluez btn-shadow addgrotesk p-3 px-4"
      >Next
      </button>
      </div>
    </div>
  );
};

export default LessonView;
