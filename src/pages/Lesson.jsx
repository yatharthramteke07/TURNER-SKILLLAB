import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { getLessonById } from '../data/modulesHelper';
import { useStudentStore } from '../store/useStudentStore';
import ModuleDetails from './ModuleDetails';
import EmptyState from '../components/common/EmptyState';

export default function Lesson() {
  const { lessonId } = useParams();
  const language = useStudentStore((state) => state.language);
  const data = getLessonById(lessonId);

  if (!data) {
    return (
      <EmptyState
        title={language === 'hi' ? 'पाठ नहीं मिला' : 'Lesson Not Found'}
        description={`The requested lesson "${lessonId}" could not be located in the curriculum.`}
        actionLabel={language === 'hi' ? 'मॉड्यूल सूची देखें' : 'View Modules'}
        actionLink="/modules"
      />
    );
  }

  // Redirect / Delegate to ModuleDetails for seamless 7-stage flow
  return <ModuleDetails />;
}
