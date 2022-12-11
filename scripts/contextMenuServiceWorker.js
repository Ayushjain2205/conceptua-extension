const generateCompletionAction = async (info) => {
  try {
    const { selectionText } = info;
    const basePromptPrefix = `Explain what ${selectionText} is from basics with the help of a cool sci-fi story with fictional characters`;
    console.log(basePromptPrefix);

    // const baseCompletion = await generate(basePromptPrefix);

    // Let's see what we get!
    // sendMessage(baseCompletion.text);
    sendMessage(
      "Once upon a time, there lived two friends, a human named Bob and a robot named AI. Bob was a scientist and AI was his assistant. One day, Bob had a brilliant idea. He wanted to create a robot that could think like a human. After months of hard work, he created AI. Bob was thrilled and immediately began teaching AI how to think and interact with the world around him. AI was able to learn quickly. He was able to understand emotions and make decisions based on what he learned. He was even able to talk to Bob! Bob was amazed and decided to put AI to the test. He gave AI a complex problem to solve. AI was able to solve the problem in a matter of minutes. Bob was so impressed that he decided to make AI his assistant on many of his projects. Bob and AI became friends and went on many adventures together. Bob was always impressed by AI's ability to think and solve problems. AI had become much more than just a robot; he was a friend and companion. AI was an example of Artificial Intelligence, or AI. AI is a type of technology that is able to think, learn, and act like a human being. It has the ability to think and act independently and make decisions based on what it has learned. AI is used in many fields, from medicine to robotics, and is constantly evolving and improving."
    );
  } catch (error) {
    console.log(error);
  }
};

const getKey = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["openai-key"], (result) => {
      if (result["openai-key"]) {
        const decodedKey = atob(result["openai-key"]);
        resolve(decodedKey);
      }
    });
  });
};

const sendMessage = (content) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0].id;

    chrome.tabs.sendMessage(
      activeTab,
      { message: "inject", content },
      (response) => {
        if (response.status === "failed") {
          console.log("injection failed.");
        }
      }
    );
  });
};

const generate = async (prompt) => {
  // Get your API key from storage
  const key = await getKey();
  const url = "https://api.openai.com/v1/completions";

  // Call completions endpoint
  const completionResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1250,
      temperature: 0.7,
    }),
  });

  // Select the top choice and send back
  const completion = await completionResponse.json();
  return completion.choices.pop();
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "context-run",
    title: "Storify this",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(generateCompletionAction);
