✅ React에 적용했던 mobx 상태관리를 Next에도 적용

✅ RootStore를 기반으로, counterStore, sizeSwitcherStore 두개의 child store를 가지는 구조.

✅ RootStore는 react context를 통해 주입되고, 필요에 따라 useRootStore로 접근 가능.
useCounterStore, useSizeSiwtcherStore custom hook으로 각 child store만 선택적으로 사용할 수 있음

🛠 Next - Mobx 연동 예제를 참고함 (https://github.com/vercel/next.js/tree/canary/examples/with-mobx)

---


How to run this project :
- git clone
- npm i
- npm run dev
