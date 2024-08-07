import React from 'react';
import { useDrag } from 'react-dnd';
import img1 from "../assets/images/board-images/img-1.jpg";
import img2 from "../assets/images/board-images/img-2.jpg";

const images = [
  { id: 1, src: img1 },
  { id: 2, src: img2 },
  // Add more images as needed
];

const DraggableImage: React.FC<{ src: string }> = ({ src }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'image',
    item: { src },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={src}
      alt=""
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move',height:"200px",width:"200px" }}
    />
  );
};

const LeftPanel: React.FC = () => {
  return (
    <div className="left-panel">
      {images.map((image) => (
        <DraggableImage key={image.id} src={image.src} />
      ))}
    </div>
  );
}

export default LeftPanel;
