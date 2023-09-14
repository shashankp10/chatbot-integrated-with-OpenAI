import React, { useState, useEffect} from 'react';

function ChatComp() {
//   const [result, setResult] = useState('');
//   const [userInput, setUserInput] = useState('');
    const [result, setResult] = useState(localStorage.getItem('result') || '');
    const [userInput, setUserInput] = useState(localStorage.getItem('userInput') || '');

    useEffect(() => {
        localStorage.setItem('result', result);
        localStorage.setItem('userInput', userInput);
    }, [result, userInput]);

    const clearLocalStorage = () => {
        localStorage.clear(); 
    };
    const handleFetchData = async () => {
        /*
    const feed =
      "Suppose you are a professional career counselor ask me some questions both educational and financial and analyze my interests and technical skills and Recommend me curricular and extra curricular career options based on my interest.  Also take a short aptitude test to cross verify that the information i am giving you is legit . Also ask these questions one by one after analysing my answers that i am giving. Also provide me a perfect roadmap through which i can follow and make my career. Points to be noted are: 1)you should not provide only 1 career options there should be more than 1 career options including both curricular and non curricular options. 2)you should also provide roadmap after i select one particular career.3)you should cross verify my answers. 4) also Recommend me non traditional career with well detailed road maps based on the passion and interest of the student rather than the limited subset of professional jobs.";
        */
    const finalVal = result + userInput;
    const apiUrl = `http://localhost:8080/openai/chat?prompt=${encodeURIComponent(finalVal)}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const textData = await response.text();
      setResult(textData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult('An error occurred while fetching data.');
    }
};

  return (
    <div>
        <h1>HackMentor</h1>
        <div className="container">
            <div className="intro">
                <p>Write your Query below</p>
            </div>
            <div className="chat-container" id="dataContainer">
            <div className="result">
                {result}
            </div>
        </div>
        <div className="input-container">
            <input
            type="text"
            id="userInput"
            placeholder="Enter your message"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button id="fetchDataButton" onClick={handleFetchData}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              className="bi bi-arrow-right-circle"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
          </button>
        </div>
      </div>
      <button onClick={clearLocalStorage}>Clear</button>
    </div>
  );
}

export default ChatComp;
