// gradesReducer.ts
interface Grade {
  subject: string;
  score: number;
}

interface GradesState {
  grades: Grade[];
}

const initialGradesState: GradesState = {
  grades: [
    { subject: 'Math', score: 95 },
    { subject: 'Science', score: 88 },
    { subject: 'History', score: 92 },
  ],
};

const gradesReducer = (state = initialGradesState, action: any): GradesState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default gradesReducer;
