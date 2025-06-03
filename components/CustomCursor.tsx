"use client";

import { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    const cursorinner = document.querySelector('.cursor2');
    const a = document.querySelectorAll('a');

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

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousemove', moveInnerCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    a.forEach(item => {
      item.addEventListener('mouseover', () => cursor?.classList.add('hover'));
      item.addEventListener('mouseleave', () => cursor?.classList.remove('hover'));
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousemove', moveInnerCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      a.forEach(item => {
        item.removeEventListener('mouseover', () => cursor?.classList.add('hover'));
        item.removeEventListener('mouseleave', () => cursor?.classList.remove('hover'));
      });
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