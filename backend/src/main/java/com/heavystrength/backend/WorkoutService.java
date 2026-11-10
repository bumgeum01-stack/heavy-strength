package com.heavystrength.backend;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;

    public WorkoutService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    public Workout saveWorkout(Workout workout) {
        return workoutRepository.save(workout);
    }

    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAll();
    }
    public Workout updateWorkout(Long id, Workout updatedWorkout) {
    Workout workout = workoutRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Workout not found"));

    workout.setExerciseName(updatedWorkout.getExerciseName());
    workout.setSets(updatedWorkout.getSets());
    workout.setReps(updatedWorkout.getReps());
    workout.setWeight(updatedWorkout.getWeight());
    workout.setWorkoutDate(updatedWorkout.getWorkoutDate());

    return workoutRepository.save(workout);
    }

    public void deleteWorkout(Long id) {
        workoutRepository.deleteById(id);
    }
}