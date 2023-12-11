import React from 'react'
import {
  useTrapFocus,
  useBodyScrollLock,
  useCloseOnEsc,
  ModalPortal,
} from 'react-customizable-modal'

function Overlay({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      {children}
    </div>
  )
}

function ModalWrapper({ children }) {
  useBodyScrollLock()
  useCloseOnEsc(onClose)
  return <>{children}</>
}

export default function CustomModal({ isOpen, onClose, children }) {
  const modalRef = useTrapFocus()
  return (
    isOpen && (
      <ModalPortal id={`customModal`}>
        <ModalWrapper>
          <Overlay>
            <div
              ref={modalRef}
              style={{
                width: 500,
                height: 400,
                backgroundColor: '#fff',
                padding: 20,
                position: 'absolute',
              }}
            >
              <button onClick={onClose}>Close modal</button>
              {children}
            </div>
          </Overlay>
        </ModalWrapper>
      </ModalPortal>
    )
  )
}