// classReducer.ts
interface Member {
  name: string;
  age: number;
  address: string;
}

interface ClassState {
  members: Member[];
}

const initialClassState: ClassState = {
  members: [
    { name: 'John Doe', age: 20, address: '123 Main St' },
    { name: 'Jane Smith', age: 22, address: '456 Elm St' },
    { name: 'Alice Johnson', age: 21, address: '789 Oak St' },
  ],
};

const classReducer = (state = initialClassState, action: any): ClassState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default classReducer;
