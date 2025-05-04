import { openai } from "@ai-sdk/openai";
import { streamText, CoreMessage } from "ai";
import * as readline from "node:readline/promises";
import dotenv from "dotenv";

dotenv.config();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages: CoreMessage[] = [];

async function main() {
  while (true) {
    const userInput = await rl.question("You: ");
    if (userInput.toLowerCase() === "exit") {
      console.log("Exiting chat...");
      break;
    }
    messages.push({ role: "user", content: userInput });

    const response = await streamText({
      model: openai("gpt-4o"),
      messages,
      temperature: 0.7,
    });

    let fullResponse = "";
    process.stdout.write("\nAssistant: ");

    for await (const delta of response.textStream) {
      fullResponse += delta;
      process.stdout.write(delta);
    }
    process.stdout.write("\n\n");

    messages.push({ role: "assistant", content: fullResponse });
  }
}

main().catch(console.error);
