import { useState, useEffect } from 'react';

function App() {
  const [exerciseName, setExerciseName] = useState('');
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');

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
    const workout = {
      exerciseName,
      weight: Number(weight),
      sets: Number(sets),
      reps: Number(reps),
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


  return (  //해당 리턴 안에는 사용자가 볼 UI를 JSX로 작성합니다
    <div>
      <h1>HeavyStrength</h1>
      <p>나만의 운동 기록 관리 서비스</p>

      <h2>오늘의 운동</h2>

      <input
        type="text"
        placeholder="운동 이름"
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
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

      <button onClick={handleSave}>운동 기록 저장</button>

      <hr />

      <h2>운동 기록 목록</h2>

      {workouts.length === 0 ? (
        <p>아직 저장된 운동 기록이 없습니다.</p>
      ) : (
        <ul>
          {workouts.map((workout) => (
  <li key={workout.id}>
    {editingId === workout.id ? (
      <div>
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

        <button onClick={() => setEditingId(null)}>
          취소
        </button>
      </div>
    ) : (
      <>
        {workout.exerciseName} /
        {workout.weight}kg /
        {workout.sets}세트 /
        {workout.reps}회

        <button onClick={() => startEdit(workout)}>
          수정
        </button>

        <button onClick={() => handleDelete(workout.id)}>
          삭제
        </button>
      </>
    )}
          </li>
        ))}
        </ul>
      )}
    </div>
  );
}

export default App;