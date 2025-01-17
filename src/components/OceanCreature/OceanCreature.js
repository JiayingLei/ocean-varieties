import React from "react";
import "./OceanCreature.css";

const OceanCreature = ({ creature, onClick, isGrayedOut }) => {
  return (
    <div
      className="creature-container"
      style={{
        top: `${(creature.position.top / 11342) * 1050}vh`,
        left: `${(creature.position.left / 1920) * 100}vw`,
      }}
      data-tooltip={creature.description.zh + "\n" + creature.description.en}
    >
      <img
        src={creature.image}
        alt={creature.name.zh}
        className={`creature-image ${isGrayedOut ? "grayed-out" : ""}`} // 根据 isGrayedOut 添加类名
        style={{
          maxWidth: `${(creature.size.width / 1920) * 100}vw`,
          maxHeight: `${(creature.size.height / 11342) * 1050}vh`,
          ...(creature.position.rotation && {
            transform: `rotate(${creature.position.rotation}deg)`,
          }),
        }}
        onClick={() => onClick(creature.id)}
      />
    </div>
  );
};

export default OceanCreature;