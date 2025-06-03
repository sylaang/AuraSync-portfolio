"use client";

import { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    const cursorinner = document.querySelector('.cursor2');

    const moveCursor = (e: MouseEvent) => {
      if (cursor instanceof HTMLElement) {
        cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
      }
    };

    const moveInnerCursor = (e: MouseEvent) => {
      if (cursorinner instanceof HTMLElement) {
        cursorinner.style.left = e.clientX + 'px';
        cursorinner.style.top = e.clientY + 'px';
      }
    };

    const handleMouseDown = () => {
      cursor?.classList.add('click');
      cursorinner?.classList.add('cursorinnerhover');
    };

    const handleMouseUp = () => {
      cursor?.classList.remove('click');
      cursorinner?.classList.remove('cursorinnerhover');
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.matches('a') || 
        target.matches('button') || 
        target.getAttribute('role') === 'button'
      ) {
        cursor?.classList.add('hover');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.matches('a') || 
        target.matches('button') || 
        target.getAttribute('role') === 'button'
      ) {
        cursor?.classList.remove('hover');
      }
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousemove', moveInnerCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousemove', moveInnerCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);

      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div className="cursor"></div>
      <div className="cursor2"></div>
    </>
  );
};

export default CustomCursor;
