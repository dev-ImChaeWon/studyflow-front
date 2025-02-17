# studyflow-front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 페이지 소개
`화면은 모바일 기준`
### [ 로그인 ]
- 선생님, 학부모 계정으로 로그인 할 수 있음
- 선생님 계정으로 로그인 시 최초화면은 학습관리 탭
- 학부모 계정으로 로그인 시 최초화면은 자녀수강정보 탭

<img src="https://github.com/user-attachments/assets/480a3f0b-5a05-49f3-b270-31981250335a" width="300" height="510"/>
<hr />

### [ 회원가입 ]
- 회원가입 시 학부모 계정 생성

<img src="https://github.com/user-attachments/assets/2008af60-767a-4305-960c-852fc999b28a" width="300" height="510"/>
<hr /> 

### 선생님 페이지
### [ 원생관리 ]
- 날짜별 학생의 출결 관리 가능
- 출석, 결석, 지각, 조퇴로 구분
- 화면의 P, A, L, LE 클릭 시 DB에 반영됨

<img src="https://github.com/user-attachments/assets/9eadf687-86d7-45e2-befd-10f8d1555d5b" width="300" height="510"/>
<hr /> 

### [ 학습관리 : 1 ]
- 숙제 미부여 탭
- 교사별, 학생별 숙제 검색 필터를 사용할 수 있음
- 회색 박스를 클릭하면 숙제 부여 탭으로 이동

<img src="https://github.com/user-attachments/assets/576ac8a7-1c1c-4ebc-be76-607e4d675853" width="300" height="510"/>
<hr /> 

### [ 학습관리 : 2 ]
- 숙제 부여 탭

<img src="https://github.com/user-attachments/assets/42f7d0d5-8c4f-4ab3-ab23-d9fef027018e" width="300" height="510"/>
<hr /> 

### [ 학습관리 : 3 ]
- 숙제 추가하기
- 숙제는 페이지 숫자로 입력할 수 있음

<img src="https://github.com/user-attachments/assets/808fbbc2-8e1a-4c9c-b842-9752ffcef715" width="300" height="510"/>
<hr /> 

### [ 학습관리 : 4 ]
- 숙제가 추가된 화면
- 완료 Page를 클릭하여 수정할 수 있음

<img src="https://github.com/user-attachments/assets/e067d18f-ac5c-44a6-a27b-528bf89a737c" width="300" height="510"/>
<hr /> 

### [ 학습관리 : 5 ]
- 완료 Page를 수정한 화면

<img src="https://github.com/user-attachments/assets/e0b64386-cc4c-4b75-80f7-0959182ab1d0" width="300" height="510"/>
<hr /> 

### [ 학습관리 : 6 ]
- 숙제 완료 탭
- 완료된 숙제를 박스에 띄움

<img src="https://github.com/user-attachments/assets/6af18508-7378-498e-bb38-55eb5d3fc3e0" width="300" height="510"/>
<hr /> 

### [ 학습관리 : 7 ]
- 숙제 미완료 탭
- 미완료된 숙제를 박스에 띄움
- 숙제 완료 정도 퍼센트(%) 표시
- 과목이 2개이며 숙제가 모두 있을 경우 숙제 완료 퍼센트는 전체 숙제를 기준으로 계산
- {(1과목 완료 Page + 2과목 완료 Page) / (전체 숙제 Page)} * 100

<img src="https://github.com/user-attachments/assets/c0e5cb73-7b80-4110-ba97-664969f461b7" width="300" height="510"/>
<hr /> 

### [ 수납관리 ]
- 수납하기 버튼을 클릭하여 수납가능
- 이미 수납된 학생은 중복 수납 불가능

<img src="https://github.com/user-attachments/assets/674a5016-8ecd-4b61-8685-5eff667058ac" width="300" height="510"/>
<hr /> 

### [ 환경설정 ]
<img src="https://github.com/user-attachments/assets/5b9610c8-a43e-4af1-8dbc-58c86ceff0d7" width="300" height="510"/>
<hr /> 

### [ 환경설정 : 학생 등록 ]
- 이름 입력란을 클릭해서 이름 작성 후 등록
<img src="https://github.com/user-attachments/assets/66c39751-3176-40bd-ac92-69ee5a622123" width="300" height="510"/>
<hr /> 

### [ 환경설정 : 학생 정보 수정 ]
- 과목별, 학생별 검색 필터를 사용할 수 있음
- 과목 추가하기 버튼으로 해당 학생에 과목 추가
- 정보 수정 버튼으로 해당 학생 정보 수정
<div style=display:flex;>
<img src="https://github.com/user-attachments/assets/9d5e4c5f-e91d-4abb-bc66-4d60eac2ab1a" width="300" height="510"/>
<img src="https://github.com/user-attachments/assets/5f8d4ca5-2fa2-427c-bcc6-8f565fa24a87" width="300" height="510"/>
<img src="https://github.com/user-attachments/assets/3d1253bf-e898-49c1-8980-60ef1f58ffd9" width="300" height="510"/>
</div>
<hr /> 

### [ 환경설정 : 교사 등록 ]
- 회원가입과 동일한 절차로 등록
<img src="https://github.com/user-attachments/assets/8f1590a7-4e99-4712-b60d-230584e4a42c" width="300" height="510"/>
<hr /> 

### [ 환경설정 : 교사 정보 수정 ]
- 과목 추가하기 버튼으로 해당 교사 담당과목 추가
- 정보 수정 버튼으로 해당 교사 정보 수정
<img src="https://github.com/user-attachments/assets/72e74ad8-89ce-4d15-b5f8-efd5a6aa9f03" width="300" height="510"/>
<hr /> 

### [ 환경설정 : 학부모 자녀 등록 ]
- DB에 존재하는 부모와 학생을 부모-자녀 관계로 등록
<img src="https://github.com/user-attachments/assets/2f25fc16-fb26-4d12-aeac-be71e6865cdb" width="300" height="510"/>
<hr /> 

### [ 환경설정 : 주간평가 점수 등록 ]
- 학생 이름으로 검색하여 토글바에 입력
- 입력된 학생의 과목만 검색되어 원하는 과목 토글바에 입력
- 점수 입력 후 등록
<img src="https://github.com/user-attachments/assets/05b6caec-ebf0-4320-aec0-87b301b43136" width="300" height="510"/>
<hr /> 

### [ 환경설정 : 수납정보 등록 ]
- 학생 이름으로 검색하여 토글바에 입력
- 입력된 학생의 과목만 검색되어 원하는 과목 토글바에 입력
- 납부금액 입력 후 등록
<img src="https://github.com/user-attachments/assets/7c458743-4576-452f-af3f-15a8f871fefb" width="300" height="510"/>
<hr /> 

### 학부모 페이지
### [ 자녀 수강정보 ]
- 현재 자녀의 수강과목을 박스로 띄움
- 박스 클릭 시 해당 과목의 주간평가 점수 탭으로 이동
<img src="https://github.com/user-attachments/assets/72b5b631-5e11-4dbe-bdec-b8bd7ef3c6f5" width="300" height="510"/>
<hr /> 

### [ 자녀 주간평가 ]
- 응시일자별 주간평가 점수 표시
<img src="https://github.com/user-attachments/assets/db5fb117-94d2-4d60-8e77-ac39e0752c2b" width="300" height="510"/>
<hr /> 

### [ 자녀 출석률 ]
- 전체 날짜의 출석률 표시
- 결석을 제외하고 출석으로 인정
- 출석률 계산 = {(출석 + 지각 + 조퇴) / (전체 합)} * 100
<img src="https://github.com/user-attachments/assets/66f2647a-9c35-4130-aba9-eea46088f576" width="300" height="510"/>
<hr /> 
