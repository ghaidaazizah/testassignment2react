import { useEffect, useState } from 'react';
import Form from './components/Form';
import Table from './components/Table';

const App = () => {
  // TODO: answer here
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudent = async () => {
    try {
      const response = await fetch('http://localhost:3001/student');
      const data = await response.json();
      setStudents(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <div>
      <h1>Student Portal</h1>
      <Form fetchStudent={fetchStudent} />
      {loading ? <p>Loading ...</p> : <Table students={students} setStudents={setStudents} />}
    </div>
  );
};

export default App;
