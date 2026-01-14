# .gitignore에서 제외한 파일을 제외하고, 깃에 포함되지 않는 폴더를 깃에 추가하는 방법

## 방법 1: `git add -f` (강제 추가)

.gitignore 규칙을 무시하고 특정 파일/폴더를 강제로 추가합니다.

```bash
# 특정 파일 강제 추가
git add -f <파일경로>

# 특정 폴더 강제 추가
git add -f <폴더경로>

# 예시
git add -f build/generated/sources/annotationProcessor/java/main/.gitkeep
git add -f frontend/src/components/.gitkeep
```

**주의**: 이 방법은 .gitignore 규칙을 우회하지만, .gitignore 파일 자체는 수정하지 않습니다.

## 방법 2: .gitignore에 예외 규칙 추가 (`!` 사용)

.gitignore 파일에 예외 규칙을 추가하여 특정 파일/폴더만 추적하도록 설정합니다.

```gitignore
# 폴더 전체 무시
build/
dist/

# 하지만 특정 파일/폴더는 예외 처리
!build/generated/sources/annotationProcessor/java/main/.gitkeep
!dist/.gitkeep
```

**예시**: 빈 폴더를 유지하고 싶은 경우

```bash
# 1. .gitkeep 파일 생성
touch build/generated/sources/annotationProcessor/java/main/.gitkeep

# 2. .gitignore에 예외 규칙 추가
# **/generated/querydsl/
# !**/generated/querydsl/.gitkeep

# 3. 일반적으로 추가
git add build/generated/sources/annotationProcessor/java/main/.gitkeep
```

## 방법 3: 빈 폴더 추가하기 (`.gitkeep` 사용)

Git은 빈 폴더를 추적하지 않으므로, `.gitkeep` 파일을 사용합니다.

```bash
# 빈 폴더에 .gitkeep 파일 생성
touch <폴더경로>/.gitkeep

# .gitignore에 예외 규칙 추가 후
git add <폴더경로>/.gitkeep
```

## 현재 프로젝트에서 무시되고 있는 항목들

현재 `.gitignore`에 의해 무시되고 있는 항목:
- `.gradle/`
- `.vscode/`
- `HELP.md`
- `build/`
- `frontend/node_modules/`
- `gradle/wrapper/gradle-wrapper.jar` (하지만 예외 규칙이 있음)

## 실전 예시

### 예시 1: QueryDSL 생성 폴더 구조 유지

```bash
# 1. .gitkeep 파일 생성
mkdir -p build/generated/querydsl
touch build/generated/querydsl/.gitkeep

# 2. .gitignore 수정 (예외 규칙 추가)
# **/generated/querydsl/
# !**/generated/querydsl/.gitkeep

# 3. 추가
git add build/generated/querydsl/.gitkeep
```

### 예시 2: 특정 설정 파일만 추가

```bash
# .vscode 폴더는 무시하지만, settings.json은 추가하고 싶은 경우
# .gitignore에 이미 예외 규칙이 있음:
# .vscode/
# !.vscode/settings.json

# 일반적으로 추가 가능
git add .vscode/settings.json
```

### 예시 3: 빌드 산출물 중 특정 파일만 추가

```bash
# build/ 폴더는 무시하지만, 특정 파일만 추가
git add -f build/classes/java/main/com/example/eme/SpringEmployeeManagerExApplication.class
```

## 주의사항

1. **강제 추가(`-f`)는 신중하게 사용**: 일반적으로 빌드 산출물이나 의존성은 Git에 포함하지 않는 것이 좋습니다.

2. **예외 규칙 순서**: `.gitignore`에서 예외 규칙(`!`)은 무시 규칙 뒤에 와야 합니다.

3. **빈 폴더**: Git은 빈 폴더를 추적하지 않으므로, 폴더 구조를 유지하려면 `.gitkeep` 파일을 사용하세요.

4. **폴더 전체 무시 규칙**: `build/`처럼 폴더 전체를 무시하는 규칙이 있으면, 하위 파일의 예외 처리가 복잡할 수 있습니다. 이 경우 `git add -f`를 사용하는 것이 더 간단합니다.

## 실제 사용 예시 (현재 프로젝트)

### QueryDSL 생성 폴더 구조 유지하기

```bash
# 1. .gitkeep 파일 생성
mkdir -p build/generated/querydsl
touch build/generated/querydsl/.gitkeep

# 2. 강제 추가 (build/ 폴더가 무시되므로)
git add -f build/generated/querydsl/.gitkeep

# 3. 커밋
git commit -m "Add .gitkeep to maintain querydsl folder structure"
```

### 다른 폴더 예시

```bash
# frontend/src 폴더 구조 유지 (이미 추적 중이므로 불필요)
# 하지만 새로운 빈 폴더를 추가하려면:

# 1. 폴더와 .gitkeep 생성
mkdir -p frontend/src/components
touch frontend/src/components/.gitkeep

# 2. 추가 (frontend/src는 무시되지 않으므로 일반 추가 가능)
git add frontend/src/components/.gitkeep
```

## 추천 방법

대부분의 경우 **방법 2 (예외 규칙 추가)**를 사용하는 것이 좋습니다:
- .gitignore 규칙이 명확하게 문서화됨
- 팀원들이 이해하기 쉬움
- 유지보수가 용이함
