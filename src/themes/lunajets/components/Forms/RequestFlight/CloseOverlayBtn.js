import React from 'react'
import { XCircle } from "react-feather";
import s from "./css/overlay.css";

const CloseOverlayBtn = ({ closeOverlay }) => {
  return (
    <button className={s.closeOverlay} onClick={(e) => closeOverlay(e)} onTouchEnd={() => closeOverlay}>
      <XCircle size="48" color="#000" />
    </button>
  )
}

export default CloseOverlayBtn;
