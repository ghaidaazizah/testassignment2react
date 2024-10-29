import { useState } from 'react';

const Form = ({ fetchStudent }) => {
  const [fullname, setFullname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('Male');
  const [programStudy, setProgramStudy] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Menentukan faculty berdasarkan programStudy
    let faculty = '';
    if (['Ekonomi', 'Manajemen', 'Akuntansi'].includes(programStudy)) {
      faculty = 'Fakultas Ekonomi';
    } else if (['Administrasi Publik', 'Administrasi Bisnis', 'Hubungan Internasional'].includes(programStudy)) {
      faculty = 'Fakultas Ilmu Sosial dan Politik';
    } else if (['Teknik Sipil', 'Arsitektur'].includes(programStudy)) {
      faculty = 'Fakultas Teknik';
    } else if (['Matematika', 'Fisika', 'Informatika'].includes(programStudy)) {
      faculty = 'Fakultas Teknologi Informasi dan Sains';
    }

    const newStudent = { fullname, birthDate, gender, faculty, programStudy };

    try {
      await fetch('http://localhost:3001/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      }).then(() => {
        fetchStudent();
      });

      // const addedStudent = await response.json();
      // setStudents((prev) => [...prev, addedStudent]);
      // Reset form fields after submission
      setFullname('');
      setBirthDate('');
      setGender('Male');
      setProgramStudy('');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <form id='form-student' onSubmit={handleSubmit}>
      <label htmlFor='input-name'>Fullname</label>
      <input type='text' id='input-name' value={fullname} onChange={(e) => setFullname(e.target.value)} data-testid='name' />

      <label htmlFor='input-date'>Birth Date</label>
      <input type='date' id='input-date' value={birthDate} onChange={(e) => setBirthDate(e.target.value)} data-testid='date' />

      <label htmlFor='input-gender'>Gender</label>
      <select id='input-gender' value={gender} onChange={(e) => setGender(e.target.value)} data-testid='gender'>
        <option value='Male'>Male</option>
        <option value='Female'>Female</option>
      </select>

      <label htmlFor='input-prody'>Program Study</label>
      <select id='input-prody' value={programStudy} onChange={(e) => setProgramStudy(e.target.value)} data-testid='prody'>
        <option value=''>Select Program Study</option>
        <option value='Ekonomi'>Ekonomi</option>
        <option value='Manajemen'>Manajemen</option>
        <option value='Akuntansi'>Akuntansi</option>
        <option value='Administrasi Publik'>Administrasi Publik</option>
        <option value='Administrasi Bisnis'>Administrasi Bisnis</option>
        <option value='Hubungan Internasional'>Hubungan Internasional</option>
        <option value='Teknik Sipil'>Teknik Sipil</option>
        <option value='Arsitektur'>Arsitektur</option>
        <option value='Matematika'>Matematika</option>
        <option value='Fisika'>Fisika</option>
        <option value='Informatika'>Informatika</option>
      </select>

      <input type='submit' value='Add student' id='add-btn' data-testid='submit' />
    </form>
  );
};

export default Form;
