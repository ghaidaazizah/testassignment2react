const Table = ({ students, setStudents }) => {
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/student/${id}`, {
        method: 'DELETE',
      });
      const updatedStudents = students.filter((student) => student.id !== id);
      setStudents(updatedStudents);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <table id='table-student'>
      <thead>
        <tr>
          <th>No</th>
          <th>Full Name</th>
          <th>Birth Date</th>
          <th>Gender</th>
          <th>Faculty</th>
          <th>Program Study</th>
          <th>Option</th>
        </tr>
      </thead>
      <tbody>
        {students &&
          students.map((student, index) => (
            <tr key={student.id} className='student-data-row'>
              <td>{index + 1}</td>
              <td>{student.fullname}</td>
              <td>{student.birthDate}</td>
              <td>{student.gender}</td>
              <td>{student.faculty}</td>
              <td>{student.programStudy}</td>
              <td>
                <button data-testid={`delete-${student.id}`} onClick={() => handleDelete(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
