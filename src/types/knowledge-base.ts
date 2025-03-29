
export type KnowledgeBaseItemType = 
  | "document" 
  | "regulation" 
  | "template" 
  | "software" 
  | "process" 
  | "research";

// Used for filtering to allow "all" as a valid option
export type KnowledgeBaseFilter = KnowledgeBaseItemType | "all";
