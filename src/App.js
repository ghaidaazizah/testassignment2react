import { useEffect, useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";

const App = () => {
    // TODO: answer here
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/student')
          .then(response => response.json())
          .then(data => {
            setStudents(data);
            setLoading(false);
          })
          .catch(error => console.error("Error fetching data:", error));
      }, []);

    return (
        <div>
          <h1>Student Portal</h1>
          <Form setStudents={setStudents} />
            {loading ? <p>Loading...</p> : <Table students={students} setStudents={setStudents} />}
        </div>
    );
};

export default App;
