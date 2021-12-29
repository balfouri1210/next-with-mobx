✅ React에 적용했던 mobx 상태관리를 Next에도 적용
✅ RootStore를 기반으로, counterStore, sizeSwitcherStore 두개의 child store를 가지는 구조.
✅ RootStore는 react context를 통해 각 사용처에서 접근 가능하고, useCounterStore, useSizeSiwtcherStore custom hook으로 RootStore에 접근 없이도 각 store를 사용할 수 있음
🛠 Next - Mobx 연동 예제를 참고함 (https://github.com/vercel/next.js/tree/canary/examples/with-mobx)

How to run this project :
- git clone
- npm i
- npm run dev
