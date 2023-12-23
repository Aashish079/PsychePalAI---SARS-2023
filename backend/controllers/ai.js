import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { loadQARefineChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

import {
  StructuredOutputParser,
  OutputFixingParser,
} from "langchain/output_parsers";
import { Document } from "langchain/document";
import { z } from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("the mood of the person who wrote the journal entry."),
    subject: z.string().describe("the subject of the journal entry."),
    negative: z
      .boolean()
      .describe(
        "is the journal entry negative? (i.e. does it contain negative emotions?)."
      ),
    summary: z.string().describe("quick summary of the entire entry."),
    counsel: z.string().describe("Give me some counselling for my current situation."),
    sentimentScore: z
      .number()
      .describe(
        "sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive."
      ),
  })
);

const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n${format_instructions}\n${entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });
    console.log("content", content);
  const input = await prompt.format({
    entry: content,
  });
  console.log("input", input,"End of input")

  return input;
};

export const analyzeEntry = async (entry) => {
    console.log("entry", entry, "Entry.content", entry.content)
  const input = await getPrompt(entry);
  const model = new OpenAI({ temperature: 0, modelName: "gpt-4" });
  const output = await model.call(input);

  try {
    return parser.parse(output);
    console.log("output", output)
  } catch (e) {
    const fixParser = OutputFixingParser.fromLLM(
      new OpenAI({ temperature: 0, modelName: "gpt-4" }),
      parser
    );
    const fix = await fixParser.parse(output);
    return fix;
  }
};

export const qa = async (question, entries) => {
  const docs = entries.map(
    (entry) =>
      new Document({
        pageContent: entry.content,
        metadata: { source: entry.id, date: entry.createdAt },
      })
  );
  const model = new OpenAI({ temperature: 0, modelName: "gpt-4" });
  const chain = loadQARefineChain(model);
  const embeddings = new OpenAIEmbeddings();
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
  const relevantDocs = await store.similaritySearch(question);
  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  });

  return res.output_text;
};
