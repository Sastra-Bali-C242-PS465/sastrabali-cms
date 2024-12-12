export default interface Quiz {
  id: number;
  question: string;
  options: {
    id: number;
    option: string;
    isAnswer: boolean;
  }[];
}
