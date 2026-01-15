import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Card } from './components/Card';
import { Button } from './components/Button';
import { questions } from './questions';
import { Triangle, Hexagon, Circle, Square, Timer, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type GameState = 'LOBBY' | 'GAME' | 'FEEDBACK' | 'SCOREBOARD';

function App() {
  const [gameState, setGameState] = useState<GameState>('LOBBY');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    let timer: number;
    if (gameState === 'GAME' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (gameState === 'GAME' && timeLeft === 0) {
      handleAnswer(null); // Time's up
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const startGame = () => {
    if (!playerName.trim()) return;
    setScore(0);
    setCurrentQuestionIndex(0);
    startQuestion();
  };

  const startQuestion = () => {
    setHasAnswered(false);
    setIsCorrect(false);
    setTimeLeft(questions[currentQuestionIndex].timeLimit);
    setGameState('GAME');
  };

  const handleAnswer = (answerId: string | null) => {
    if (hasAnswered) return;
    setHasAnswered(true);

    const correct = currentQuestion.answers.find(a => a.isCorrect)?.id === answerId;
    setIsCorrect(correct);

    if (correct) {
      // Calculate score based on time left
      const points = 1000 * (1 - ((currentQuestion.timeLimit - timeLeft) / (2 * currentQuestion.timeLimit)));
      setScore((prev) => prev + Math.round(points));
    }

    setGameState('FEEDBACK');
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      startQuestion();
    } else {
      setGameState('SCOREBOARD');
    }
  };

  const getShape = (id: string) => {
    switch (id) {
      case 'A': return <Triangle className="w-8 h-8 fill-current" />;
      case 'B': return <Hexagon className="w-8 h-8 fill-current rotate-90" />; // Diamond-ish
      case 'C': return <Circle className="w-8 h-8 fill-current" />;
      case 'D': return <Square className="w-8 h-8 fill-current" />;
      default: return null;
    }
  };

  const getVariant = (id: string) => {
    switch (id) {
      case 'A': return 'quiz-red';
      case 'B': return 'quiz-blue';
      case 'C': return 'quiz-yellow';
      case 'D': return 'quiz-green';
      default: return 'primary';
    }
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">

        {/* LOBBY */}
        {gameState === 'LOBBY' && (
          <motion.div
            key="lobby"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full max-w-md text-center"
          >
            <h1 className="text-6xl font-black mb-2 tracking-tighter drop-shadow-lg">KiHoot!</h1>
            <p className="text-white/80 mb-8 text-xl">Bereit für das Quiz?</p>
            <Card className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Dein Name"
                className="w-full px-6 py-4 rounded-xl text-center text-2xl font-bold text-gray-800 focus:outline-none focus:ring-4 ring-brand-blue"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && startGame()}
                autoFocus
              />
              <Button size="lg" onClick={startGame} disabled={!playerName.trim()} className="w-full">
                Los geht's!
              </Button>
            </Card>
          </motion.div>
        )}

        {/* GAME */}
        {gameState === 'GAME' && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-4xl flex flex-col items-center"
          >
            <div className="flex justify-between w-full mb-8 px-4">
              <div className="px-6 py-2 glass rounded-full font-bold text-xl">
                {currentQuestionIndex + 1} / {questions.length}
              </div>
              <div className="px-6 py-2 glass rounded-full font-bold text-xl flex items-center gap-2">
                Punkte: {score}
              </div>
            </div>

            <Card className="mb-8 text-center py-12 relative overflow-visible">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 rounded-full bg-brand-purple border-4 border-white flex items-center justify-center shadow-xl">
                  <span className="text-3xl font-black">{timeLeft}</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
                {currentQuestion.text}
              </h2>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {currentQuestion.answers.map((answer) => (
                <Button
                  key={answer.id}
                  variant={getVariant(answer.id)}
                  size="xl"
                  onClick={() => handleAnswer(answer.id)}
                  className="h-32 text-left justify-start px-8 group"
                >
                  <div className="mr-6 p-2 bg-black/20 rounded-lg group-hover:bg-black/10 transition-colors">
                    {getShape(answer.id)}
                  </div>
                  <span className="text-2xl drop-shadow-md">{answer.text}</span>
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {/* FEEDBACK */}
        {gameState === 'FEEDBACK' && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="text-center"
          >
            <div className={cn("text-5xl font-black mb-8 p-8 rounded-3xl backdrop-blur-md shadow-2xl border-4 text-white",
              isCorrect ? "bg-green-500/80 border-green-400" : "bg-red-500/80 border-red-400"
            )}>
              {isCorrect ? "Richtig!" : "Falsch!"}
              <div className="text-2xl mt-2 font-medium opacity-90">
                {isCorrect ? "+ Punkte" : "Leider keine Punkte..."}
              </div>
            </div>

            <Button variant="secondary" size="lg" onClick={nextQuestion}>
              Weiter
            </Button>
          </motion.div>
        )}

        {/* SCOREBOARD */}
        {gameState === 'SCOREBOARD' && (
          <motion.div
            key="scoreboard"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center w-full max-w-lg"
          >
            <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6 drop-shadow-[0_0_30px_rgba(250,204,21,0.6)] animate-bounce" />
            <h1 className="text-5xl font-black mb-2">Ergebnis</h1>
            <Card className="mb-8">
              <div className="text-xl text-white/70 mb-2">{playerName}</div>
              <div className="text-6xl font-black text-brand-purple mb-4">{score}</div>
              <div className="text-sm font-bold uppercase tracking-widest text-brand-pink">Punkte</div>
            </Card>
            <Button variant="primary" size="lg" onClick={() => setGameState('LOBBY')}>
              Neues Spiel
            </Button>
          </motion.div>
        )}

      </AnimatePresence>
    </Layout>
  );
}

export default App;
