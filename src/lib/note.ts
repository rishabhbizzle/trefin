import { type JSONContent } from "@tiptap/core";

export const extractTitle = (value: JSONContent) => {
  let processedValue = value;

  if (typeof value === "string") {
    // convert into object
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    processedValue = JSON.parse(value);
  }

  // Searching for the text inside the 'heading' type
  const contentArray = processedValue.content ?? [];
  for (const contentItem of contentArray) {
    if (!contentItem.content) {
      return "untitled";
    }
    for (const innerContent of contentItem.content) {
      const text = innerContent.text ?? "";
      return text.length > 36
        ? text.substring(0, 36) + "..."
        : text;
    }
  }
  return "untitled";
};

export const exportContentAsText = (value: JSONContent) => {
  let processedValue = value;

  if (typeof value === "string") {
    // convert into object
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    processedValue = JSON.parse(value);
  }

  // Recursive function to find text in content
  const findText = (content: JSONContent): string[] => {
    let texts = [];
  
    // Base case: if the node itself is a text node, add its text to the array
    if (content.type === 'text') {
      texts.push(content.text ?? "");
    }
    
    // Check if the content has a 'content' property, which indicates further nesting
    if (content.content && Array.isArray(content.content)) {
      for (const child of content.content) {
        // Recursively call the function for each child content in the content array
        texts = texts.concat(findText(child));
      }
    }
    
    // Return all found text values
    return texts;
  }

  // Searching for the text inside the 'paragraph' type
  const contentArray = processedValue.content ?? [];
  const textArray = contentArray.flatMap(findText);

  // Skip the first line
  return textArray.slice(1).join("\n");
}

const defaultData = { "type": "doc", "content": [{ "type": "heading", "attrs": { "level": 2 }, "content": [{ "type": "text", "text": "Welcome to Notty notes! (OPEN ME)" }, { "type": "text", "marks": [{ "type": "code" }], "text": "notty.dhr.wtf" }] }, { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "⚡ Features" }] }, { "type": "paragraph", "content": [{ "type": "text", "marks": [{ "type": "textStyle", "attrs": { "color": "" } }], "text": "Notty is " }, { "type": "text", "text": "an " }, { "type": "text", "marks": [{ "type": "italic" }], "text": "AI-powered notes app " }, { "type": "text", "text": "built for " }, { "type": "text", "marks": [{ "type": "bold" }, { "type": "textStyle", "attrs": { "color": "#2563EB" } }], "text": "productivity and speed" }, { "type": "text", "marks": [{ "type": "textStyle", "attrs": { "color": "rgb(37, 99, 235)" } }], "text": ". " }, { "type": "text", "text": "Type " }, { "type": "text", "marks": [{ "type": "code" }], "text": "/" }, { "type": "text", "text": " for commands, and start typing with " }, { "type": "text", "marks": [{ "type": "code" }], "text": "++" }, { "type": "text", "text": " for the " }, { "type": "text", "marks": [{ "type": "italic" }], "text": "\"Continue writing\"" }, { "type": "text", "text": " feature. " }] }, { "type": "paragraph", "content": [{ "type": "text", "text": "You can also " }, { "type": "text", "marks": [{ "type": "italic" }], "text": "Talk to your notes or search using AI" }, { "type": "text", "text": ", but you need to " }, { "type": "text", "marks": [{ "type": "link", "attrs": { "href": "https://notty.dhr.wtf/api/auth/signin/google", "target": "_blank", "rel": "noopener noreferrer nofollow", "class": "novel-text-stone-400 novel-underline novel-underline-offset-[3px] hover:novel-text-stone-600 novel-transition-colors novel-cursor-pointer" } }, { "type": "textStyle", "attrs": { "color": "#2563EB" } }], "text": "sign in" }, { "type": "text", "marks": [{ "type": "textStyle", "attrs": { "color": "#2563EB" } }], "text": " " }, { "type": "text", "text": "for that first. Then, go to your home page and see the magic happen! ✨ " }] }, { "type": "paragraph", "content": [{ "type": "text", "text": "Many of these AI features are made with " }, { "type": "text", "marks": [{ "type": "link", "attrs": { "href": "https://embedchain.ai", "target": "_blank", "rel": "noopener noreferrer nofollow", "class": "novel-text-stone-400 novel-underline novel-underline-offset-[3px] hover:novel-text-stone-600 novel-transition-colors novel-cursor-pointer" } }], "text": "Embedchain" }] }, { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "❤️ Support" }] }, { "type": "paragraph", "content": [{ "type": "text", "text": "BTW - Notty is open source. here's the link - " }, { "type": "text", "marks": [{ "type": "link", "attrs": { "href": "https://github.com/dhravya/notty", "target": "_blank", "rel": "noopener noreferrer nofollow", "class": "novel-text-stone-400 novel-underline novel-underline-offset-[3px] hover:novel-text-stone-600 novel-transition-colors novel-cursor-pointer" } }], "text": "https://github.com/dhravya/notty" }, { "type": "text", "text": ". A ⭐ star would be" }, { "type": "text", "marks": [{ "type": "italic" }], "text": " really appreciated." }] }, { "type": "paragraph", "content": [{ "type": "text", "text": "It costs to run this app, so if you " }, { "type": "text", "marks": [{ "type": "italic" }], "text": "really" }, { "type": "text", "text": " like notty, you can " }, { "type": "text", "marks": [{ "type": "link", "attrs": { "href": "https://github.com/sponsors/Dhravya", "target": "_blank", "rel": "noopener noreferrer nofollow", "class": "novel-text-stone-400 novel-underline novel-underline-offset-[3px] hover:novel-text-stone-600 novel-transition-colors novel-cursor-pointer" } }], "text": "Sponsor me on Github" }, { "type": "text", "text": " or " }, { "type": "text", "marks": [{ "type": "link", "attrs": { "href": "https://ko-fi.com/dhravya", "target": "_blank", "rel": "noopener noreferrer nofollow", "class": "novel-text-stone-400 novel-underline novel-underline-offset-[3px] hover:novel-text-stone-600 novel-transition-colors novel-cursor-pointer" } }], "text": "Buy me a Coffee" }, { "type": "text", "text": " or just tweet about us." }] }, { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "⭐ Credit" }] }, { "type": "paragraph", "content": [{ "type": "text", "text": "This project, like many others has been built on many amazing open source projects. " }, { "type": "hardBreak" }, { "type": "text", "text": "Thanks to" }] }, { "type": "bulletList", "attrs": { "tight": true }, "content": [{ "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "marks": [{ "type": "link", "attrs": { "href": "https://vaul.emilkowal.ski/", "target": "_blank", "rel": "noopener noreferrer nofollow", "class": "novel-text-stone-400 novel-underline novel-underline-offset-[3px] hover:novel-text-stone-600 novel-transition-colors novel-cursor-pointer" } }], "text": "https://vaul.emilkowal.ski/" }] }] }, { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "marks": [{ "type": "link", "attrs": { "href": "https://embedchain.ai", "target": "_blank", "rel": "noopener noreferrer nofollow", "class": "novel-text-stone-400 novel-underline novel-underline-offset-[3px] hover:novel-text-stone-600 novel-transition-colors novel-cursor-pointer" } }], "text": "https://embedchain.ai" }, { "type": "text", "text": " " }] }] }, { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "marks": [{ "type": "link", "attrs": { "href": "https://github.com/steven-tey/novel", "target": "_blank", "rel": "noopener noreferrer nofollow", "class": "novel-text-stone-400 novel-underline novel-underline-offset-[3px] hover:novel-text-stone-600 novel-transition-colors novel-cursor-pointer" } }], "text": "https://github.com/steven-tey/novel" }] }] }] }] }

export default defaultData;