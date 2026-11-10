
# HeavyStrength

**운동 기록 관리 웹 서비스**

HeavyStrength는 사용자가 자신의 운동 기록을 체계적으로 관리할 수 있도록 개발한 웹 애플리케이션입니다.

운동 종목, 운동 무게, 세트 수, 반복 횟수 및 운동 날짜를 기록하고 관리할 수 있습니다. React 기반의 프론트엔드와 Spring Boot 기반의 백엔드를 연동하고, MySQL 데이터베이스를 통해 운동 기록을 저장합니다.

---

## 1. 프로젝트 소개

- **프로젝트명:** HeavyStrength
- **프로젝트 유형:** 운동 기록 관리 웹 서비스
- **개발 목적:** React와 Spring Boot를 활용한 풀스택 웹 애플리케이션 개발 및 데이터 처리 과정 학습
- **주요 목표:** 운동 기록의 등록, 조회, 수정, 삭제 기능을 구현하고 프론트엔드와 백엔드 간 데이터 통신 및 데이터베이스 연동 경험을 쌓는 것

## 2. 주요 기능

### 운동 기록 관리 (CRUD)

- **Create:** 새로운 운동 기록 등록
- **Read:** 저장된 운동 기록 조회
- **Update:** 기존 운동 기록 수정
- **Delete:** 운동 기록 삭제

### 운동 정보 관리

각 운동 기록에 다음 정보를 저장할 수 있습니다.

- 운동 종목
- 운동 무게 (Weight)
- 세트 수 (Sets)
- 반복 횟수 (Reps)
- 운동 날짜 (Workout Date)

### 입력값 검증

- 필수 입력값 누락 방지
- 숫자 입력값 검증
- 잘못된 운동 기록 입력 방지
- 운동 기록 등록 및 수정 시 입력값 검증

### 사용자 인터페이스

- React 기반의 사용자 인터페이스
- 운동 기록을 쉽게 확인할 수 있는 목록 화면
- 운동 기록 등록 및 수정 폼
- 다크 네이비 기반의 UI 디자인

## 3. 기술 스택

| 구분 | 기술 |
|---|---|
| Frontend | React, JavaScript, Vite, CSS |
| Backend | Java, Spring Boot |
| ORM | Spring Data JPA |
| Database | MySQL |
| Build Tool | Gradle |
| Version Control | Git, GitHub |

## 4. 시스템 구조

```text
HeavyStrength
│
├── frontend
│   ├── React
│   ├── JavaScript
│   └── CSS
│
└── backend
    ├── Spring Boot
    ├── Controller
    ├── Service
    ├── Repository
    ├── Entity
    └── MySQL
```

## 5. 데이터 처리 흐름

사용자가 프론트엔드에서 운동 기록을 등록하거나 수정하면 React는 HTTP 요청을 통해 Spring Boot 백엔드에 데이터를 전달합니다.

백엔드는 요청을 처리하고 Spring Data JPA를 통해 MySQL 데이터베이스에 접근합니다.

```text
사용자
  ↓
React Frontend
  ↓ HTTP 요청
Spring Boot Controller
  ↓
Service
  ↓
Repository
  ↓
JPA
  ↓
MySQL Database
```

데이터 조회 시에는 위 흐름을 통해 조회된 데이터가 다시 프론트엔드로 전달되며, React 화면에 운동 기록이 표시됩니다.

## 6. 프로젝트 실행 방법

### 사전 준비

- Java
- Node.js 및 npm
- MySQL
- Git

### 1) 프로젝트 다운로드

```bash
git clone https://github.com/bumgeum01-stack/heavy-strength.git
cd heavy-strength
```

### 2) 데이터베이스 설정

MySQL에서 `heavy_strength` 데이터베이스를 생성합니다.

```sql
CREATE DATABASE heavy_strength;
```

Spring Boot의 데이터베이스 연결 설정을 확인합니다.

`backend/src/main/resources/application.properties` 파일에서 MySQL 연결 정보가 현재 실행 환경과 일치해야 합니다.

### 3) 백엔드 실행

```bash
cd backend
./gradlew bootRun
```

### 4) 프론트엔드 실행

새로운 터미널을 열고 다음 명령어를 실행합니다.

```bash
cd frontend
npm install
npm run dev
```

### 5) 웹페이지 접속

브라우저에서 다음 주소로 접속합니다.

```text
http://localhost:5173
```

## 7. 프로젝트를 통해 학습한 내용

- React를 활용한 컴포넌트 기반 UI 개발
- React의 상태 관리 및 데이터 렌더링
- Fetch API를 활용한 프론트엔드와 백엔드 간 통신
- Spring Boot의 Controller, Service, Repository 구조 이해
- Spring Data JPA를 활용한 데이터베이스 연동
- Entity와 데이터베이스 테이블 간 매핑
- REST API를 활용한 CRUD 기능 구현
- 입력값 검증 및 사용자 인터페이스 개선
- Git과 GitHub를 활용한 버전 관리

## 8. 향후 개선 방향

- 사용자 회원가입 및 로그인 기능
- 사용자별 운동 기록 관리
- 운동 기록 통계 및 시각화
- 운동 종목별 기록 분석
- Docker를 활용한 컨테이너 기반 배포
- 클라우드 환경 배포 및 운영

---

**Repository:** [https://github.com/bumgeum01-stack/heavy-strength](https://github.com/bumgeum01-stack/heavy-strength)
