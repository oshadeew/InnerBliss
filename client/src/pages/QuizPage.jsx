import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const quizData = {
  depression: {
    name: 'Depression',
    questions: [
      { q: 'How often do you feel sad or down?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have trouble enjoying things you used to enjoy?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'How often do you feel tired or have low energy?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have difficulty concentrating?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'How often do you feel worthless or guilty?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have changes in appetite or weight?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'How often do you have trouble sleeping?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you feel isolated or withdrawn from others?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you feel hopeless about the future?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Have you lost interest in social activities?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
    ],
  },
  anxiety: {
    name: 'Anxiety',
    questions: [
      { q: 'How often do you feel nervous or on edge?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have trouble controlling your worrying?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'How often do you worry about different things?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have difficulty relaxing?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'How often are you so restless you can\'t sit still?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you become easily annoyed or irritable?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you feel afraid as if something awful might happen?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you experience physical symptoms like rapid heartbeat?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you avoid situations that make you anxious?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have panic attacks?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
    ],
  },
  ptsd: {
    name: 'PTSD',
    questions: [
      { q: 'Do you have recurring unwanted memories of a stressful event?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have flashbacks or feel like the event is happening again?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have nightmares about the stressful event?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you avoid reminders of the event?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you feel emotionally numb or detached?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Are you easily startled or frightened?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have trouble sleeping?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have angry outbursts?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you feel guilt or blame yourself?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have difficulty trusting others?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
    ],
  },
  bipolar: {
    name: 'Bipolar Disorder',
    questions: [
      { q: 'Do you experience periods of unusually high energy?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have periods of feeling very sad followed by very happy?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you go through periods of needing less sleep?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have racing thoughts or talk very fast sometimes?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you make impulsive decisions during high-energy periods?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do your mood swings affect your relationships?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you feel unusually confident or powerful at times?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you go from very productive to unable to function?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you spend money excessively during high periods?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have extreme reactions to everyday events?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
    ],
  },
  ocd: {
    name: 'OCD',
    questions: [
      { q: 'Do you have unwanted thoughts that keep coming back?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you feel the need to check things repeatedly?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have to do things in a specific order?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you wash your hands more than necessary?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you count things or repeat actions?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do intrusive thoughts cause you distress?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you feel anxious if you can\'t perform a ritual?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do your habits interfere with daily life?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you need things to be symmetrical or exact?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you hoard items you don\'t need?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
    ],
  },
  borderline: {
    name: 'Borderline Personality',
    questions: [
      { q: 'Do you have intense fear of abandonment?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have unstable relationships?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have an unstable sense of self?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you engage in impulsive behaviors?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have emotional instability?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you feel chronically empty?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have difficulty controlling anger?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you alternate between idealizing and devaluing others?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you feel periods of disconnection from reality?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have a pattern of self-destructive behavior?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
    ],
  },
  insomnia: {
    name: 'Insomnia',
    questions: [
      { q: 'How often do you have difficulty falling asleep?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you wake up during the night?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you wake up too early in the morning?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you feel tired during the day?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Does poor sleep affect your mood?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you worry about your sleep?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Does poor sleep affect your work or daily activities?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you use electronics before bed?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you rely on sleep aids?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { q: 'Do you have a consistent sleep schedule?', options: ['Always', 'Often', 'Sometimes', 'Never'] },
    ],
  },
};

export default function QuizPage() {
  const { disorder } = useParams();
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);

  const quiz = quizData[disorder];
  if (!quiz) {
    navigate('/neuro-tests');
    return null;
  }

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Calculate result
      const score = answers.reduce((sum, a) => sum + (a || 0), 0);
      const maxScore = quiz.questions.length * 3; // max option index is 3
      const percentage = Math.round((score / maxScore) * 100);
      navigate(`/neuro-tests/${disorder}/result`, {
        state: { score, percentage, totalQuestions: quiz.questions.length, disorder },
      });
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const question = quiz.questions[currentQ];
  const progress = ((currentQ + 1) / quiz.questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <button onClick={() => navigate('/neuro-tests')} className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm mb-6">
        <FiArrowLeft /> Back to Tests
      </button>

      <div className="glass-card p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{quiz.name} Assessment</h2>
        <p className="text-sm text-gray-500 mb-6">Question {currentQ + 1} of {quiz.questions.length}</p>

        {/* Progress bar */}
        <div className="h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question */}
        <h3 className="text-lg font-semibold text-gray-700 mb-6">{question.q}</h3>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all duration-200 ${
                answers[currentQ] === i
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-gray-50 text-gray-700 hover:bg-primary-50 hover:text-primary-700 border border-gray-100'
              }`}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-xs mr-3">
                {String.fromCharCode(65 + i)}
              </span>
              {option}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQ === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              currentQ === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiArrowLeft /> Previous
          </button>
          <button
            onClick={handleNext}
            disabled={answers[currentQ] === undefined}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-medium transition-all ${
              answers[currentQ] === undefined
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            {currentQ === quiz.questions.length - 1 ? 'See Results' : 'Next'} <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
