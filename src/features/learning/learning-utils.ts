import type { LearningState } from '@/store/types';
import type { PddQuestion } from '@/features/questions/question-bank';

export function getAnsweredUniqueCount(learning: LearningState): number {
  return Object.keys(learning.questionProgress).length;
}

export function getMasteredCount(learning: LearningState): number {
  return Object.values(learning.questionProgress).filter((item) => item.correct).length;
}

export function getReadinessPercent(learning: LearningState, totalQuestions: number): number {
  if (totalQuestions <= 0) {
    return 0;
  }

  const mastered = getMasteredCount(learning);
  return Math.max(0, Math.min(100, Math.round((mastered / totalQuestions) * 100)));
}

export function getNextLearningIndex(
  questions: PddQuestion[],
  learning: LearningState,
): number {
  if (!questions.length) {
    return 0;
  }

  if (learning.lastQuestionId) {
    const lastIndex = questions.findIndex((question) => question.id === learning.lastQuestionId);
    if (lastIndex >= 0) {
      return (lastIndex + 1) % questions.length;
    }
  }

  const firstUnanswered = questions.findIndex(
    (question) => !learning.questionProgress[question.id],
  );

  return firstUnanswered >= 0 ? firstUnanswered : 0;
}

export function getWrongQuestions(
  questions: PddQuestion[],
  learning: LearningState,
): PddQuestion[] {
  const wrong = new Set(learning.wrongQuestionIds);
  return questions.filter((question) => wrong.has(question.id));
}
