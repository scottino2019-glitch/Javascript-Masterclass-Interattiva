export type Lesson = {
  id: string;
  id_mod: string;
  title: string;
  description: string;
  content: string;
  initialCode?: string;
  challenge?: string;
};

export type Module = {
  id: string;
  title: string;
  icon: string;
  lessons: Lesson[];
};
