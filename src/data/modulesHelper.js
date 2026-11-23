import { YEAR_1_MODULES } from './year1Modules';
import { YEAR_2_MODULES } from './year2Modules';

export const ALL_MODULES = [...YEAR_1_MODULES, ...YEAR_2_MODULES];

export const getModuleById = (id) => {
  if (!id) return null;
  return ALL_MODULES.find((m) => m.id === id || m.id.toLowerCase() === id.toLowerCase()) || null;
};

export const getLessonById = (lessonId) => {
  if (!lessonId) return null;
  for (const mod of ALL_MODULES) {
    if (mod.lessons && mod.lessons.length > 0) {
      const found = mod.lessons.find((l) => l.id === lessonId);
      if (found) {
        return { lesson: found, module: mod };
      }
    }
  }
  return null;
};
