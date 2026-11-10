import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [exerciseName, setExerciseName] = useState('');
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [workoutDate, setWorkoutDate] = useState(
  new Date().toISOString().split('T')[0]
  );

  const [editingId, setEditingId] = useState(null);
  const [editWorkout, setEditWorkout] = useState({});
  const [workouts, setWorkouts] = useState([]);

  // 1. 운동 기록 조회
  async function fetchWorkouts() {
    try {
      const response = await fetch('/api/workouts');

      if (!response.ok) {
        throw new Error('운동 기록 조회 실패');
      }

      const data = await response.json();
      setWorkouts(data);
    } catch (error) {
      console.error(error);
    }
  }

  // 화면이 처음 나타날 때 실행
  useEffect(() => {
    fetchWorkouts();
  }, []);

  // 2. 운동 기록 저장
  async function handleSave() {
    if (
      exerciseName.trim() === '' ||
      weight === '' ||
      sets === '' ||
      reps === ''
    ) {
      alert('운동 이름, 중량, 세트 수, 반복 횟수를 모두 입력해주세요.');
      return;
    }

    if (
      Number(weight) < 0 ||
      Number(sets) <= 0 ||
      Number(reps) <= 0
    ) {
      alert('중량은 0 이상, 세트 수와 반복 횟수는 1 이상 입력해주세요.');
      return;
    }
    const workout = {
      exerciseName,
      weight: Number(weight),
      sets: Number(sets),
      reps: Number(reps),
      workoutDate,
    };

    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workout),
      });

      if (!response.ok) {
        throw new Error('운동 기록 저장 실패');
      }

      alert('운동 기록이 저장되었습니다!');

      await fetchWorkouts();

      setExerciseName('');
      setWeight('');
      setSets('');
      setReps('');
    } catch (error) {
      console.error(error);
      alert('저장 중 오류가 발생했습니다.');
    }
  }

  // 3. 운동 기록 삭제
  async function handleDelete(id) {
    try {
      const response = await fetch(`/api/workouts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('운동 기록 삭제 실패');
      }

      await fetchWorkouts();
      alert('운동 기록이 삭제되었습니다!');
    } catch (error) {
      console.error(error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  }

      // 운동 기록 수정
    async function handleUpdate(id, updatedWorkout) {
      if (
        updatedWorkout.exerciseName.trim() === '' ||
        updatedWorkout.workoutDate === '' ||
        updatedWorkout.weight === '' ||
        updatedWorkout.sets === '' ||
        updatedWorkout.reps === ''
      ) {
        alert('운동 이름, 날짜, 중량, 세트 수, 반복 횟수를 모두 입력해주세요.');
        return;
      }

      if (
        Number(updatedWorkout.weight) < 0 ||
        Number(updatedWorkout.sets) <= 0 ||
        Number(updatedWorkout.reps) <= 0
      ) {
        alert('중량은 0 이상, 세트 수와 반복 횟수는 1 이상 입력해주세요.');
        return;
      }
      try {
        const response = await fetch(`/api/workouts/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedWorkout),
        });

        if (!response.ok) {
          throw new Error('운동 기록 수정 실패');
        }

        await fetchWorkouts();
        alert('운동 기록이 수정되었습니다!');
      } catch (error) {
        console.error(error);
        alert('수정 중 오류가 발생했습니다.');
      }
    }
    function startEdit(workout) {
      setEditingId(workout.id);
      setEditWorkout({ ...workout });
    }



return (
  <div className="app-container">
    <header className="app-header">
      <h1>HeavyStrength</h1>
      <p>나만의 운동 기록 관리 서비스</p>
    </header>

    <section className="card">
      <h2>오늘의 운동</h2>

      <div className="workout-form">
        <input
          type="text"
          placeholder="운동 이름"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />

        <input
          type="date"
          value={workoutDate}
          onChange={(e) => setWorkoutDate(e.target.value)}
        />

        <input
          type="number"
          placeholder="중량 (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <input
          type="number"
          placeholder="세트 수"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />

        <input
          type="number"
          placeholder="반복 횟수"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />

        <button className="save-button" onClick={handleSave}>
          운동 기록 저장
        </button>
      </div>
    </section>

    <section className="card">
      <h2>운동 기록 목록</h2>

      {workouts.length === 0 ? (
        <p>아직 저장된 운동 기록이 없습니다.</p>
      ) : (
        <ul className="workout-list">
          {workouts.map((workout) => (
            <li className="workout-item" key={workout.id}>
              {editingId === workout.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editWorkout.exerciseName ?? ''}
                    onChange={(e) =>
                      setEditWorkout({
                        ...editWorkout,
                        exerciseName: e.target.value,
                      })
                    }
                  />

                  <input
                    type="date"
                    value={editWorkout.workoutDate ?? ''}
                    onChange={(e) =>
                      setEditWorkout({
                        ...editWorkout,
                        workoutDate: e.target.value,
                      })
                    }
                  />

                  <input
                    type="number"
                    value={editWorkout.weight ?? ''}
                    onChange={(e) =>
                      setEditWorkout({
                        ...editWorkout,
                        weight: e.target.value,
                      })
                    }
                  />

                  <input
                    type="number"
                    value={editWorkout.sets ?? ''}
                    onChange={(e) =>
                      setEditWorkout({
                        ...editWorkout,
                        sets: e.target.value,
                      })
                    }
                  />

                  <input
                    type="number"
                    value={editWorkout.reps ?? ''}
                    onChange={(e) =>
                      setEditWorkout({
                        ...editWorkout,
                        reps: e.target.value,
                      })
                    }
                  />

                  <div className="edit-actions">
                    <button
                      onClick={async () => {
                        await handleUpdate(workout.id, {
                          ...editWorkout,
                          weight: Number(editWorkout.weight),
                          sets: Number(editWorkout.sets),
                          reps: Number(editWorkout.reps),
                        });

                        setEditingId(null);
                      }}
                    >
                      변경사항 저장
                    </button>

                    <button
                      className="cancel-button"
                      onClick={() => setEditingId(null)}
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="workout-date">
                    {workout.workoutDate || '날짜 미입력'}
                  </p>

                  <div className="workout-info">
                    {workout.exerciseName} / {workout.weight}kg /{' '}
                    {workout.sets}세트 / {workout.reps}회
                  </div>

                  <div className="workout-actions">
                    <button onClick={() => startEdit(workout)}>
                      수정
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(workout.id)}
                    >
                      삭제
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  </div>
);
}

export default App;