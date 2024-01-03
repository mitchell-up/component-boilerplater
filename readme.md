# 보일러플레이트 자동 생성기

코드를 실행하여 컴포넌트 제작 시 필요한 기본 파일과 코드들을 자동으로 생성해줍니다. 각 파일에는 필요한 package를 import하고 구현을 위한 아주 기본적인 코드들이 들어 있습니다.

-   index.ts
-   Component.tsx
-   Component.test.tsx
-   Component.stories.tsx

 <br/>

### 자동 생성하기

RUI 프로젝트의 root 디렉토리에서 실행하세요. 이미 script에 작성되어 있습니다.
**컴포넌트 명은 Pascal Case로 입력하세요.**

```
npm run auto-generate <Component name>
```

<br/>

### 컴파일하기

코드를 js 파일로 트랜스파일링 합니다. 코드를 수정하고 코드 실행을 위해 반드시 실행하세요.

```
npm run compile
```

### 실행하기

```
npm run generate <Component name>
```
