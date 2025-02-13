import React, { useEffect, useRef, useState } from 'react'

import './css/Book3d.css'

function Book3d({ book }) {
  console.log(book);

  const [loading, setLoading] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [rotation, setRotation] = useState(0);

  const bookRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;

    setRotation((prevRotation) => {
      const x = (e.clientX - prevRotation) / 1;
      return x;
    });
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  useEffect(() => {
    if (isMouseDown) {
      bookRef.current.addEventListener('mousemove', handleMouseMove);
    } else {
      bookRef.current.removeEventListener('mousemove', handleMouseMove);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMouseDown]);

  useEffect(() => {
    if(book['covers'] === undefined){
        setLoading(false);
    }
  }, [book]);

  return (
    <div className='book-container'
        ref={bookRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{cursor: isMouseDown ? 'grabbing' : 'grab'}}>
        {loading && (<div className='d-flex justify-content-center'><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>)}
        <div className='book'
        style={loading ? {transform: `rotateY(${rotation}deg)`, display: 'none'} : {transform: `rotateY(${rotation}deg)`, display: 'flex'}}>
            <div className='front-cover'>
            {book.coverUri !== undefined && <img alt={`${book.title} cover`} onLoad={() => setLoading(false)} src={book.coverUri}/>}
            </div>
            <div className='back-cover'></div>
            <div className='shadow'></div>
        </div>
    </div>
  )
}

export default Book3d