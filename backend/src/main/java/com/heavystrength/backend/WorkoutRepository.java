package com.heavystrength.backend;//운동 기록 전용 DB 담당

import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
}