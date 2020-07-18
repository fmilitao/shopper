import React from 'react';
import { ToastContainer, cssTransition, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const logger = toast;

export default function () {
  // copied from Slide to change durations
  // https://github.com/fkhadra/react-toastify/blob/da5fab4006456434d7ad29360aa702d2c725a9a1/src/components/Transitions.tsx
  const transition = cssTransition({
    enter: `Toastify__slide-enter`,
    exit: `Toastify__slide-exit`,
    duration: [200, 200],
    appendPosition: true,
  });

  // TODO: more customization?
  // https://github.com/fkhadra/react-toastify/issues/455

  return (
    <ToastContainer
      transition={transition}
      position="bottom-left"
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
    />
  );
}
