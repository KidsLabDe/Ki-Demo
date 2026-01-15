export interface Question {
    id: number;
    text: string;
    timeLimit: number;
    answers: {
        id: 'A' | 'B' | 'C' | 'D';
        text: string;
        isCorrect: boolean;
    }[];
}

export const questions: Question[] = [
    {
        id: 1,
        text: "Welche Programmiersprache wurde 1991 von Guido van Rossum veröffentlicht?",
        timeLimit: 20,
        answers: [
            { id: 'A', text: "Java", isCorrect: false },
            { id: 'B', text: "Python", isCorrect: true },
            { id: 'C', text: "C++", isCorrect: false },
            { id: 'D', text: "Ruby", isCorrect: false },
        ],
    },
    {
        id: 2,
        text: "Was bedeutet 'HTML'?",
        timeLimit: 15,
        answers: [
            { id: 'A', text: "Hyperlinks and Text Markup Language", isCorrect: false },
            { id: 'B', text: "Home Tool Markup Language", isCorrect: false },
            { id: 'C', text: "Hyper Text Markup Language", isCorrect: true },
            { id: 'D', text: "Hyper Text Main Logic", isCorrect: false },
        ],
    },
    {
        id: 3,
        text: "Welches Tier ist das Logo von Linux?",
        timeLimit: 10,
        answers: [
            { id: 'A', text: "Pinguin", isCorrect: true },
            { id: 'B', text: "Eidechse", isCorrect: false },
            { id: 'C', text: "Katze", isCorrect: false },
            { id: 'D', text: "Hund", isCorrect: false },
        ],
    },
    {
        id: 4,
        text: "Wie viele Bits hat ein Byte?",
        timeLimit: 10,
        answers: [
            { id: 'A', text: "4", isCorrect: false },
            { id: 'B', text: "8", isCorrect: true },
            { id: 'C', text: "16", isCorrect: false },
            { id: 'D', text: "32", isCorrect: false },
        ],
    },
];
